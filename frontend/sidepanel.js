document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['reseachNotes'], function(result) {
        if(result.reseachNotes) {
            document.getElementById('notes').value = result.reseachNotes;
        }
    });

    document.getElementById('summarizeBtn').addEventListener('click', summarizeText);
    document.getElementById('saveNotesBtn').addEventListener('click', saveNotes);
});

async function summarizeText() {
    try {
        const[tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const[{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => window.getSelection().toString(),   
        });
        if (!result) {
            alert('Please select some text to summarize.');
            return;
        }
        const response = await fetch('http://localhost:8091/api/research', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: result, operation: 'summerize' }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        showResult(data.replace(/\n/g, '<br>'));
    } catch (error) {
        console.error('Error summarizing text:', error);
    }
}

async function saveNotes() {
    const notes = document.getElementById('notes').value;
    chrome.storage.local.set({ reseachNotes: notes }, function() {
        alert('Notes saved successfully!');
    });
}

function showResult(content) {
    document.getElementById('results').innerHTML = 
    `<div class="result-item">
        <div class="result-content">${content}</div>
    </div>`;
}
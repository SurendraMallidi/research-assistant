# research-assistant

Research Assistant is a lightweight AI workflow for capturing highlighted content in the browser, generating concise summaries through Google Gemini, and keeping working notes close to the source material.

## Overview

This project is split into two parts:

- **Backend (`/backend`)**: a Spring Boot service that accepts research content, builds prompts, and sends them to the Gemini API for summarization or related-topic generation.
- **Frontend (`/frontend`)**: a Chrome extension that opens in the side panel, reads selected text from the active tab, submits it to the backend, and stores research notes locally in the browser.

The current browser workflow is optimized for fast summarization and note-taking while reading online material.

## Setup

### Prerequisites

Make sure the following are available on your machine:

- **Java 21**
- **Chrome or Chromium**
- **A Google Gemini API key**

### Backend setup

1. Export the environment variables required by the Spring Boot service:

   ```bash
   export GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/<model>:generateContent?key="
   export GEMINI_KEY="<your-gemini-api-key>"
   ```

2. Start the backend from `./backend`:

   ```bash
   cd backend
   chmod +x mvnw # only if the wrapper is not already executable
   ./mvnw spring-boot:run
   ```

3. The service runs on **http://localhost:8091** and exposes the research API at:

   ```text
   POST /api/research
   ```

### Chrome extension setup

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select `./frontend`.

Once loaded, the extension side panel can be opened from the browser action.

## Usage

1. Start the backend.
2. Open any web page and highlight the text you want to summarize.
3. Open the Research Assistant side panel and click **Summarize**.
4. Review the generated output and save notes locally in the extension.

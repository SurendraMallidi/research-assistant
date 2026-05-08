package com.research_assistant.controller;

import com.research_assistant.dto.ResearchRequest;
import com.research_assistant.service.ResearchService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/research")
@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ResearchController {

    private final ResearchService researchService;

    @PostMapping
    public ResponseEntity<String> processContent(@RequestBody ResearchRequest researchRequest){
        String result = researchService.processRequest(researchRequest);
        return ResponseEntity.ok(result);
    }
}

package com.lifeline.controller;

import com.lifeline.model.HealthMetric;
import com.lifeline.repository.HealthMetricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "*") // Allows your frontend file to communicate cleanly with the server
public class HealthController {

    @Autowired
    private HealthMetricRepository repository;

    @PostMapping("/analyze")
    public HealthMetric analyzeAndSaveMetrics(@RequestBody HealthMetric metric) {
        // Core logical assessment engine inside Java
        String calculationResult = "Low Risk";
        
        if (metric.getBloodPressure() > 140 || metric.getCholesterol() > 240 || metric.getHeartRate() > 100) {
            calculationResult = "High Risk";
        } else if (metric.getBloodPressure() > 120 || metric.getCholesterol() > 200) {
            calculationResult = "Moderate Risk";
        }
        
        metric.setRiskResult(calculationResult);
        return repository.save(metric);
    }

    @GetMapping("/history")
    public List<HealthMetric> getHealthHistory() {
        return repository.findTop10ByOrderByCreatedAtDesc();
    }
}
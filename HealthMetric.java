package com.lifeline.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_metrics")
public class HealthMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private Integer age;
    private Integer bloodPressure;
    private Integer cholesterol;
    private Integer heartRate;
    private String risk_result;
    
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public Integer getBloodPressure() { return bloodPressure; }
    public void setBloodPressure(Integer bloodPressure) { this.bloodPressure = bloodPressure; }
    public Integer getCholesterol() { return cholesterol; }
    public void setCholesterol(Integer cholesterol) { this.cholesterol = cholesterol; }
    public Integer getHeartRate() { return heartRate; }
    public void setHeartRate(Integer heartRate) { this.heartRate = heartRate; }
    public String getRiskResult() { return risk_result; }
    public void setRiskResult(String riskResult) { this.risk_result = riskResult; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
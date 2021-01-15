package com.example.demo.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Pharmacy;
import com.example.demo.repositories.PharmacyRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PharmacyController {

    private final PharmacyRepository pharmacyrRepository;

    public PharmacyController(PharmacyRepository pharmacyrRepository) {
        this.pharmacyrRepository = pharmacyrRepository;
    }

    @GetMapping("/pharmacies")
    public List<Pharmacy> getPharmacies() {
        return (List<Pharmacy>) pharmacyrRepository.findAll();
    }

    @PostMapping("/pharmacies")
    void addPharmacies(@RequestBody Pharmacy pharmacy) {
    	pharmacyrRepository.save(pharmacy);
    }
}
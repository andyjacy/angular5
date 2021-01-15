package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Pharmacy;

@Repository
public interface PharmacyRepository extends CrudRepository<Pharmacy, Long>{}
package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private final String address;
    private final String pharmacy;
    
    public Pharmacy() {
        this.address = "";
        this.pharmacy = "";
    }
    
    public Pharmacy(String address, String pharmacy) {
        this.address = address;
        this.pharmacy = pharmacy;
    }

    public long getId() {
        return id;
    }
    
    public String getAddress() {
        return address;
    }

    public String getPharmacy() {
        return pharmacy;
    }
    
    @Override
    public String toString() {
        return "Pharmacy{" + "id=" + id + ", address=" + address + ", pharmacy=" + pharmacy + '}';
    }
}

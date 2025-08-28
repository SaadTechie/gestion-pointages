package com.ram.pointageapp.service;

import com.ram.pointageapp.model.Admin;
import java.util.List;

public interface AdminService {
    List<Admin> getAll();
    Admin getById(Long id);
    Admin save(Admin admin);
    void delete(Long id);
    Admin getByEmail(String email);
}

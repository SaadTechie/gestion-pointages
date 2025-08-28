package com.ram.pointageapp.service.impl;

import com.ram.pointageapp.model.Admin;
import com.ram.pointageapp.repository.AdminRepository;
import com.ram.pointageapp.service.AdminService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public List<Admin> getAll() {
        return adminRepository.findAll();
    }

    @Override
    public Admin getById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    @Override
    public Admin save(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public void delete(Long id) {
        adminRepository.deleteById(id);
    }

    @Override
    public Admin getByEmail(String email) {
        return (Admin) adminRepository.findByEmail(email).orElse(null);
    }
}

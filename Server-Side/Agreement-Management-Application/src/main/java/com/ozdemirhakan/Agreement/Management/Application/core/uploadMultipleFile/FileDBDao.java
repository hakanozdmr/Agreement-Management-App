package com.ozdemirhakan.Agreement.Management.Application.core.uploadMultipleFile;

import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileDBDao extends JpaRepository<Files, Long> {
    Files getByName(String fileName);
}

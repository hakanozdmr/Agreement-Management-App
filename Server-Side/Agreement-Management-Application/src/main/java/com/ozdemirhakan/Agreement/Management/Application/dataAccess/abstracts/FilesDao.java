package com.ozdemirhakan.Agreement.Management.Application.dataAccess.abstracts;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilesDao extends JpaRepository<Files,Long> {
    Files getByName(String fileName);
}

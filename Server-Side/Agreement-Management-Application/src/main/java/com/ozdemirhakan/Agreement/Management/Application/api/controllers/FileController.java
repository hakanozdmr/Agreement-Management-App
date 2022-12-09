package com.ozdemirhakan.Agreement.Management.Application.api.controllers;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import com.ozdemirhakan.Agreement.Management.Application.core.fileservice.ws.FileResponse;
import com.ozdemirhakan.Agreement.Management.Application.core.fileservice.ws.FileStorageService;
import com.ozdemirhakan.Agreement.Management.Application.core.uploadMultipleFile.FileDBDao;
import com.ozdemirhakan.Agreement.Management.Application.dataAccess.abstracts.AgreementDao;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Files;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("files")
@CrossOrigin
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private AgreementDao agreementDao;

    @PutMapping
    public ResponseEntity<?> uploadFile( MultipartFile[] files , Long agreementId){
//        String fileName = fileStorageService.storeFile(file);
        System.out.println(agreementId);
        var agreement = agreementDao.getById((long) agreementId);
        System.out.println(agreementId);
        List<String> fileNames = new ArrayList<>();
        Arrays.asList(files).stream().forEach(file -> {
            String fileName = file.getOriginalFilename();
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/files/")
                    .path(fileName)
                    .toUriString();
            FileResponse fileResponse = new FileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
            Files a = new Files(fileName,file.getContentType(),fileDownloadUri,file.getSize(),agreement);
            fileNames.add(fileResponse.getFileDownloadUri());
            fileStorageService.storeFile(a);
        });
        String message = "Uploaded the files successfully: " + fileNames;
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,HttpServletRequest request){

        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String contentType = null;

        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        }catch(IOException ex) {
            System.out.println("Could not determine fileType");
        }

        if(contentType==null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }


}

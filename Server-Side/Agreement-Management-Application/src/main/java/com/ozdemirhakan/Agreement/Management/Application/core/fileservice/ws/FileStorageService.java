package com.ozdemirhakan.Agreement.Management.Application.core.fileservice.ws;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


import com.ozdemirhakan.Agreement.Management.Application.core.uploadMultipleFile.FileDBDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

	private final Path fileStorageLocation;

	@Autowired
	private FileDBDao fileDBRepository;
	
	@Autowired
	public FileStorageService(FileStorageProperties fileStorageProperties) {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
		
		try {
			Files.createDirectories(this.fileStorageLocation);
			
		}catch(Exception ex) {
			throw new FileStorageException("Could not create the directory to upload");
		}
	}
	
	
//	function to store the file
		public com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Files storeFile(com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Files file) {

//		String fileName = StringUtils.cleanPath(file.getFilename());
//		var FileDB = new com.ozdemirhakan.Agreement.Management.Application.entities.concretes.
//				Files(fileName, file.getFileType(), file.getFileDownloadUri(),file.getSize());

		return fileDBRepository.save(file);
	}
	
	
//	function to load the file
	public Resource loadFileAsResource(String fileName) {
		try {
			Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if(resource.exists()) {
				return resource;
			}else {
				throw new MyFileNotFoundException("File not found " + fileName);
			}
		}catch(MalformedURLException ex) {
			throw new MyFileNotFoundException("File not found " + fileName);
		}
	}

	public Long gethisIDbyName(String fileName){
		com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Files file = fileDBRepository.getByName(fileName);
		return file.getId();
	}
}

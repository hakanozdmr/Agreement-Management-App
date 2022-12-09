package com.ozdemirhakan.Agreement.Management.Application.core.fileservice.ws;

public class FileStorageException extends RuntimeException{

	public FileStorageException(String message) {
		super(message);
	}
	
	public FileStorageException(String message,Throwable cause) {
		super(message,cause);
	}
}

package com.projeto05.backend.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
public class NaoEncontradoException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public NaoEncontradoException(String message) {
		super(message);
	}
}
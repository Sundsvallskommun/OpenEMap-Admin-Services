package org.oemap.services.exceptions;

public class InvalidConfigIdException extends Exception {
	private String message = null;

	public InvalidConfigIdException() {
		this.message = "Invalid config id specified.";
	}

	public InvalidConfigIdException(String message) {
		this.message = message;
	}

	@Override
	public String getMessage() {
		return message;
	}
}


package isd.group6.hanu.exception;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * Handle exception
 */

public class RalException extends RuntimeException {

	private static final long serialVersionUID = -5988318425352566566L;
	private Integer statusCode;
	private Integer code;
	private String errorMessages;
	
	public RalException(Integer code, String defaultMessage) {
		this.errorMessages = defaultMessage;
		this.code = code;
	}
	
	public RalException(Integer statusCode, Integer code, String defaultMessage) {
		super(defaultMessage);
		this.statusCode = statusCode;
		this.code = code;
	}

	public RalException(Integer statusCode, Integer code, String defaultMessage, Throwable cause) {
		super(defaultMessage, cause);
		this.statusCode = statusCode;
		this.code = code;
	}

	public String getMessage() {
		if (this.errorMessages != null) {
			return this.errorMessages.toString() + " " + super.getMessage();
		}
		return super.getMessage();
	}

	public Integer getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(Integer statusCode) {
		this.statusCode = statusCode;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getErrorMessages() {
		return errorMessages;
	}

	public void setErrorMessages(String errorMessages) {
		this.errorMessages = errorMessages;
	}

}

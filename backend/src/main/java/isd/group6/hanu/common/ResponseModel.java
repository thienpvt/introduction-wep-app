package isd.group6.hanu.common;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * Common response model
 */

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseModel {

    protected Integer code;
    protected HttpStatus statusCode;
    protected String message;
    protected Object content;
    protected Long totalRecords;

    public ResponseModel(Integer code, HttpStatus statusCode, String message, Object content) {
        this.code = code;
        this.statusCode = statusCode;
        this.message = message;
        this.content = content;
    }
}

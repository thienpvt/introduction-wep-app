package isd.group6.hanu.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
@Setter
public final class ResponseStatus {
    private String code;
    private String message;
    private HttpStatus httpCode;
}

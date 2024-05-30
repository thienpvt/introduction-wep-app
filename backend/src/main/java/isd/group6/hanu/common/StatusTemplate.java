package isd.group6.hanu.common;

import org.springframework.http.HttpStatus;

public interface StatusTemplate {
    ResponseStatus SUCCESS =
            new ResponseStatus("SUCCESS", "SUCCESS", HttpStatus.OK);
    ResponseStatus USER_NOT_FOUND =
            new ResponseStatus("USER", "user not found", HttpStatus.NOT_FOUND);
    ResponseStatus EXPIRE_TOKEN =
            new ResponseStatus("TOKEN-EXPIRED", "toke expired", HttpStatus.BAD_REQUEST);
    ResponseStatus TOKEN_IN_VALID =
            new ResponseStatus(String.valueOf(HttpStatus.UNAUTHORIZED.value()), "invalid token", HttpStatus.BAD_REQUEST);
    ResponseStatus VALID_FINGERPRINT =
            new ResponseStatus(String.valueOf(HttpStatus.UNAUTHORIZED.value()), "invalid fingerprint", HttpStatus.BAD_REQUEST);
    ResponseStatus FINGERPRINT_NOT_FOUND =
            new ResponseStatus(String.valueOf(HttpStatus.UNAUTHORIZED.value()), "fingerprint not found", HttpStatus.BAD_REQUEST);
}

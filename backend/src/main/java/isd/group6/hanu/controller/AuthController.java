package isd.group6.hanu.controller;

import isd.group6.hanu.common.LoginModel;
import isd.group6.hanu.common.ResponseModel;
import isd.group6.hanu.entity.UserInfo;
import isd.group6.hanu.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * This class is used to handle the auth request from the client to the server
 */


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseModel login(@RequestBody LoginModel loginModel, HttpServletRequest request, HttpServletResponse response){
        return authService.loginWebService(loginModel, request, response);
    }

    @PostMapping("/signup")
    public ResponseModel signup(@RequestBody UserInfo loginModel, HttpServletRequest request, HttpServletResponse response){
        return authService.signupWebService(loginModel, request, response);
    }

}

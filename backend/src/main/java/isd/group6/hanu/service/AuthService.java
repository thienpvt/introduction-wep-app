package isd.group6.hanu.service;
import isd.group6.hanu.common.LoginModel;
import isd.group6.hanu.common.ResponseModel;
import isd.group6.hanu.entity.UserInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * This class is used to define the auth service interface
 */

public interface AuthService {

    ResponseModel loginWebService(LoginModel loginModel, HttpServletRequest request, HttpServletResponse response);

    ResponseModel signupWebService(UserInfo loginModel, HttpServletRequest request, HttpServletResponse response);
}
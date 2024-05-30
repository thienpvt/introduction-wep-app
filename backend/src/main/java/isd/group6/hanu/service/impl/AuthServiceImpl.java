package isd.group6.hanu.service.impl;

import isd.group6.hanu.common.LoginModel;
import isd.group6.hanu.common.ResponseModel;
import isd.group6.hanu.entity.UserInfo;
import isd.group6.hanu.repository.UserInfoRepository;
import isd.group6.hanu.security.JwtService;
import isd.group6.hanu.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * This class is used to implement the auth service interface
 */

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private JwtService jwt;

    @Autowired
    private AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public ResponseModel loginWebService(LoginModel loginModel, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginModel.getUsername(), loginModel.getPassword());
        try {
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            return addAuthAndGetToken(authentication, request);
        } catch (Exception e) {
            e.printStackTrace();
            return loginFailHandler(loginModel);
        }
    }

    @Override
    public ResponseModel signupWebService(UserInfo entity, HttpServletRequest request, HttpServletResponse response) {
        UserInfo userInfo= userInfoRepository.findByUsername(entity.getUsername()).orElse(null);
        if (userInfo != null) {
            ResponseModel responseModel = new ResponseModel();
            responseModel.setCode(1);
            responseModel.setStatusCode(HttpStatus.BAD_REQUEST);
            responseModel.setContent("Username is already taken");
            return responseModel;
        }
        entity.setPassword(encoder.encode(entity.getPassword()));
        UserInfo newUser=userInfoRepository.save(entity);
        String jwtToken = jwt.generateToken(newUser.getUsername(), newUser.getId());
        String bearerToken = "Bearer " + jwtToken;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", bearerToken);

        Map<String, String> json = new HashMap<>();
        json.put("LOGIN","1");
        ResponseModel responseModel = new ResponseModel();
        responseModel.setStatusCode(HttpStatus.OK);
        responseModel.setCode(0);
        json.put("Bearer", bearerToken);
        responseModel.setContent(json);
        return responseModel;

    }

    private ResponseModel addAuthAndGetToken(Authentication authentication, HttpServletRequest request) {
        ResponseModel responseModel = new ResponseModel();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserInfo user = userInfoRepository.findByUsername(authentication.getName()).orElse(null);


/*         check user_role
        List<Roles> rolesList = rolesService.getRolesByUserId(user.getId());
        if (rolesList.isEmpty()) {
            log.debug(LoginCode.ERR_USER_NOT_HAVE_ROLES.toString() + ":" + authentication.getName());
            responseModel.setStatusCode(LoginCode.ERR_USER_NOT_HAVE_ROLES.getStatusCode());
            responseModel.setContent(LoginCode.ERR_USER_NOT_HAVE_ROLES.getDescription());
            return responseModel;
        }*/

        String jwtToken = jwt.generateToken(user.getUsername(), user.getId());
        String bearerToken = "Bearer " + jwtToken;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", bearerToken);

        Map<String, String> json = new HashMap<>();
        json.put("LOGIN","1");
        responseModel.setStatusCode(HttpStatus.OK);
        responseModel.setCode(0);
        json.put("Bearer", bearerToken);
        responseModel.setContent(json);
        return responseModel;
    }

    private ResponseModel loginFailHandler(LoginModel loginModel) {
        String username = loginModel.getUsername();
        ResponseModel responseModel = new ResponseModel();
        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        if (!userInfo.isPresent()) {
            System.out.println("User not found");
            responseModel.setStatusCode(HttpStatus.NOT_FOUND);
            responseModel.setContent("User not found");
            responseModel.setCode(1);
            return responseModel;
        }
        responseModel.setStatusCode(HttpStatus.FOUND);
        responseModel.setCode(1);
        responseModel.setContent("Password is incorrect");
        return responseModel;
    }


}

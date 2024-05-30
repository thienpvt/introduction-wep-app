package isd.group6.hanu.service.impl;

import isd.group6.hanu.entity.UserInfo;
import isd.group6.hanu.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * This class is used to implement security user details service
 */

@Service
public class UserInfoService implements UserDetailsService{

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo userInfo= userInfoRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        Set<GrantedAuthority> listGrantedAuthorities = new HashSet<GrantedAuthority>();
        return new User(userInfo.getUsername(), userInfo.getPassword(),listGrantedAuthorities);
    }
}

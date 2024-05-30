package isd.group6.hanu.repository;

import isd.group6.hanu.entity.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * Repository for user info
 */

@Repository
public interface UserInfoRepository extends MongoRepository<UserInfo, String> {

    Optional<UserInfo> findByUsername(String username);
}

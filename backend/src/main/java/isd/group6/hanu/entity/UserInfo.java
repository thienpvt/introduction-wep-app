package isd.group6.hanu.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * Entity for user info
 */
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
@Data
public class UserInfo {

    @Id
    private String id;

    private String username;

    private String password;

    private Integer status;
}

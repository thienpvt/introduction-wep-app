package isd.group6.hanu.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "categories")
public class Category {

    @Id
    private String id;

    private String name;

    private Integer level;

    private String parentId;

    private Integer status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}

package isd.group6.hanu.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import isd.group6.hanu.common.UploadFile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    private String name;

    private String brand;

    private String category;

    private String model;

    private String voltage;

    private String power;

    private double price;

    private Integer status;

    private List<String> description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<UploadFile> files;

    private List<String> fileIds;
}

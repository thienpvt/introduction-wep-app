package isd.group6.hanu.dto;

import isd.group6.hanu.common.LoadFile;
import isd.group6.hanu.common.UploadFile;
import isd.group6.hanu.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ProductDTO {

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

}

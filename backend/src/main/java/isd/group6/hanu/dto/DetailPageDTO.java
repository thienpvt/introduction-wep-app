package isd.group6.hanu.dto;

import isd.group6.hanu.common.UploadFile;
import isd.group6.hanu.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class DetailPageDTO {

    private List<Product> similarProducts;

    private Product product;

    private List<UploadFile> files;

    private String categoryName;

    private String parentCategoryName;
}

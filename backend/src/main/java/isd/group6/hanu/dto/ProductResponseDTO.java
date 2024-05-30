package isd.group6.hanu.dto;

import isd.group6.hanu.common.LoadFile;
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
public class ProductResponseDTO {

    private Product product;

    private List<LoadFile> images;

}

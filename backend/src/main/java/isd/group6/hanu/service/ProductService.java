package isd.group6.hanu.service;

import isd.group6.hanu.common.ResponseModel;
import isd.group6.hanu.dto.ProductDTO;
import isd.group6.hanu.entity.Product;

public interface ProductService extends IRootService<Product> {

    ResponseModel findByCategory(String category);

    ResponseModel findByNameContaining(String name);

    ResponseModel doSearch(String keyword, String categoryId, int page, int perPage);
}

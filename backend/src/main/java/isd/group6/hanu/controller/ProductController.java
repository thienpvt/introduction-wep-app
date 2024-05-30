package isd.group6.hanu.controller;

import isd.group6.hanu.common.ResponseModel;
import isd.group6.hanu.dto.ProductDTO;
import isd.group6.hanu.entity.Product;
import isd.group6.hanu.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private HttpServletRequest request;

    @GetMapping()
    public ResponseModel doSearch(@RequestParam (name="keyword",required = false)String keyword,
                                  @RequestParam (name="categoryId",required = false)String categoryId,
                                  @RequestParam(name="page", defaultValue = "0") int page,
                                  @RequestParam(name="perPage", defaultValue = "10") int perPage){
        return productService.doSearch(keyword, categoryId, page, perPage);
    }

    @PostMapping()
    public ResponseModel doCreate(@RequestBody Product data){
        return productService.create(data);
    }
    @PutMapping()
    public ResponseModel doUpdate(@RequestBody Product data){
        return productService.update(data);
    }

    @GetMapping("/find-by-name")
    public ResponseModel findByNameContaining(@RequestParam(name = "name") String name){
        return productService.findByNameContaining(name);
    }

    @GetMapping("/find-by-category")
    public ResponseModel findByCategory(@RequestParam(name = "category") String category){
        return productService.findByCategory(category);
    }

    @GetMapping("/{id}")
    public ResponseModel doRetrieve(@PathVariable String id){
        return productService.retrieve(id);
    }

    @DeleteMapping("/{id}")
    public ResponseModel doDelete(@PathVariable String id){
        return productService.delete(id);
    }
}

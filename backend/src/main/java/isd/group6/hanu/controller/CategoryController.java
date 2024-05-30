package isd.group6.hanu.controller;

import isd.group6.hanu.common.ResponseModel;
import isd.group6.hanu.entity.Category;
import isd.group6.hanu.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * This class is example for a rest controller
 */

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseModel doSearch(@RequestParam(name = "name",required = false) String name,
                                  @RequestParam(name = "level",required = false) Integer level,
                                  @RequestParam(name = "page", defaultValue = "0") int page,
                                  @RequestParam(name = "perPage", defaultValue = "10") int perPage){
        return categoryService.doSearch(name, level, page, perPage);
    }
    @GetMapping("/find-by-parent-id")
    public ResponseModel findByParentId(@RequestParam(name = "parentId") String parentId){
        return categoryService.findByParentId(parentId);
    }

    @GetMapping("/retrieve-all")
    public ResponseModel retrieveAll(){
        return categoryService.retrieveAll();
    }

    @PostMapping
    public ResponseModel create(@RequestBody Category entity){
        return categoryService.create(entity);
    }

    @PutMapping
    public ResponseModel update(@RequestBody Category entity){
        return categoryService.update(entity);
    }

    @DeleteMapping("/{id}")
    public ResponseModel delete(@PathVariable String id){
        return categoryService.delete(id);
    }

    @GetMapping("/dropdown")
    public ResponseModel getDropdownLevel(){
        return categoryService.getDropdownLevel();
    }
}

package isd.group6.hanu.service.impl;

import isd.group6.hanu.common.BaseService;
import isd.group6.hanu.common.ResponseFrontendDefine;
import isd.group6.hanu.common.ResponseModel;
import isd.group6.hanu.dto.DropdownLevelDTO;
import isd.group6.hanu.dto.Option;
import isd.group6.hanu.entity.Category;
import isd.group6.hanu.repository.CategoryRepository;
import isd.group6.hanu.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CategoryServiceImpl extends BaseService implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseModel retrieveAll() {
        try{
            List<Category> category = categoryRepository.findAll();
            if(category.isEmpty()){
                return new ResponseModel(ResponseFrontendDefine.CODE_NOT_FOUND, HttpStatus.BAD_REQUEST, "Empty!", null);
            }
            return new ResponseModel(0, HttpStatus.OK,"1", category);
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel create(Category entity) {
        try{
            Category category = categoryRepository.findByName(entity.getName()).orElse(null);
            if(category != null){
                return new ResponseModel(ResponseFrontendDefine.CODE_ALREADY_EXIST, HttpStatus.BAD_REQUEST, "Existed!", null);
            }
            entity.setCreatedAt(LocalDateTime.now());
            entity.setLevel(2);
            Category saveCategory = categoryRepository.save(entity);
            return new ResponseModel(0, HttpStatus.OK,"1", saveCategory);
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel retrieve(String id) {
        return null;
    }

    @Override
    public ResponseModel update(Category entity) {
        try{
            Category category = categoryRepository.findById(entity.getId()).orElse(null);
            if(category == null){
                return new ResponseModel(ResponseFrontendDefine.CODE_NOT_FOUND, HttpStatus.BAD_REQUEST, "Not found!", null);
            }
            entity.setCreatedAt(category.getCreatedAt());
            entity.setUpdatedAt(LocalDateTime.now());
            Category saveCategory = categoryRepository.save(entity);
            return new ResponseModel(0, HttpStatus.OK,"1", saveCategory);
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel delete(String id) {
        return null;
    }

    @Override
    public ResponseModel findByParentId(String parentId) {
        try{
            List<Category> categories = categoryRepository.findByParentId(parentId);
            if(categories.isEmpty()){
                return new ResponseModel(ResponseFrontendDefine.CODE_NOT_FOUND, HttpStatus.BAD_REQUEST, "Not found!", null);
            }
            return new ResponseModel(0, HttpStatus.OK,"1", categories);
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel doSearch(String name, Integer level, int page, int perPage) {
        try{
            Pageable pageable = PageRequest.of(page, perPage);
            Page<Category> categories = categoryRepository.doSearch(name, level==null, level, pageable);
            if(categories.isEmpty()){
                return new ResponseModel(ResponseFrontendDefine.CODE_NOT_FOUND, HttpStatus.BAD_REQUEST, "Not found!", null);
            }
            return new ResponseModel(0, HttpStatus.OK,"1", categories.getContent(), categories.getTotalElements());
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel getDropdownLevel() {
        try{
            List<Option> options1 = categoryRepository.getDropdownLevel(1);
            List<Option> options2 = categoryRepository.getDropdownLevel(2);
            return new ResponseModel(0, HttpStatus.OK,"1", new DropdownLevelDTO(options1, options2));
        }
        catch (Exception e) {
            throw handleException(e);
        }
    }
}

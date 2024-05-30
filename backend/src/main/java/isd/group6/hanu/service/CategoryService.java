package isd.group6.hanu.service;

import isd.group6.hanu.common.ResponseModel;
import isd.group6.hanu.entity.Category;

public interface CategoryService extends IRootService<Category>{
    ResponseModel findByParentId(String parentId);

    ResponseModel doSearch(String name, Integer level, int page, int perPage);

    ResponseModel getDropdownLevel();
}

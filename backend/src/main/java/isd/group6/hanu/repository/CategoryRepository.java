package isd.group6.hanu.repository;

import isd.group6.hanu.dto.Option;
import isd.group6.hanu.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    List<Category> findByParentId(String parentId);

    Optional<Category> findByName(String name);

    @Query("{$or : [{'name':{\"$regex\" : ?0, $options:'i' },'level': ?#{ [1] ? {$exists :true} : [2] } }]}")
    Page<Category> doSearch(String name, Boolean existLevel, Integer level, Pageable pageable);

    @Query(value="{ 'level': ?0}",fields="{ 'value': '$_id', 'label': '$name' , 'parentId': '$parentId'}")
    List<Option> getDropdownLevel(int i);
}

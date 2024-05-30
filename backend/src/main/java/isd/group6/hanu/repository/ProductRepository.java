package isd.group6.hanu.repository;

import isd.group6.hanu.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    Optional<Product> findByNameEquals(String name);

    List<Product> findByCategory(String category);

    Page<Product> findByCategory(String category,Pageable pageable);

    Page<Product> findByNameContaining(String name, Pageable pageable);

    List<Product> findByNameContaining(String name);

    @Query("{$or : [{'name':{\"$regex\" : ?0, $options:'i' },'category': {\"$regex\" : ?1, $options:'i' } }]} ")
    Page<Product> doSearch( String keyword, String categoryId, Pageable pageable);
}

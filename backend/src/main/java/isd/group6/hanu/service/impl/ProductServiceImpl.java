package isd.group6.hanu.service.impl;

import isd.group6.hanu.common.*;
import isd.group6.hanu.dto.DetailPageDTO;
import isd.group6.hanu.dto.ProductDTO;
import isd.group6.hanu.entity.Category;
import isd.group6.hanu.entity.Product;
import isd.group6.hanu.repository.CategoryRepository;
import isd.group6.hanu.repository.ProductRepository;
import isd.group6.hanu.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl extends BaseService implements ProductService {

    @Autowired
    private FileService fileService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseModel retrieveAll() {
        try{
            List<Product> products = productRepository.findAll();
            if(products.isEmpty()){
                return new ResponseModel(ResponseFrontendDefine.CODE_NOT_FOUND, HttpStatus.BAD_REQUEST, "Empty!", null);
            }
            return new ResponseModel(0, HttpStatus.OK,"1", products);
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel create(Product entity) {

        try{
            System.out.println("ProductServiceImpl.create");
            Product product = productRepository.findByNameEquals(entity.getName()).orElse(null);
            if(product != null){
                return new ResponseModel(ResponseFrontendDefine.CODE_ALREADY_EXIST, HttpStatus.BAD_REQUEST, "Already exist!", null);
            }
            List<UploadFile> tempFiles= List.copyOf(entity.getFiles());
            entity.setFiles(null);
            List<String> fileIds =new ArrayList<>();
            for (UploadFile tempFile : tempFiles) {
                MockMultipartFile mmf = Util.convertBase64ToMutilFile(tempFile);
                fileIds.add(fileService.addFile(mmf, tempFile.getNameFile()));
            }
            entity.setCreatedAt(LocalDateTime.now());
            entity.setFileIds(fileIds);
            Product saveProduct=productRepository.save(entity);
            return new ResponseModel(0, HttpStatus.OK,"Create successful", saveProduct);
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel retrieve(String id) {
        try{
            System.out.println("ProductServiceImpl.retrieve");
            Product entity = productRepository.findById(id).orElse(null);
            if(entity == null){
                return new ResponseModel(ResponseFrontendDefine.CODE_NOT_FOUND, HttpStatus.BAD_REQUEST, "Not found!", null);
            }
            List<UploadFile> files = new ArrayList<>();
            if(entity.getFileIds()!=null){
                for(String fileId: entity.getFileIds()){
                    UploadFile file = fileService.downloadFile(fileId);
                    files.add(file);
                }
            }
            List<Product> similarProducts = productRepository.findByCategory(entity.getCategory());
            for(Product product: similarProducts){
                if(product.getFileIds() != null&&!product.getFileIds().isEmpty()){
                    UploadFile file = fileService.downloadFile(product.getFileIds().get(0));
                    product.setFiles(List.of(file));
                }
            }
            Category category = categoryRepository.findById(entity.getCategory()).orElse(null);
            assert category != null;
            Category parentCategory = categoryRepository.findById(category.getParentId()).orElse(null);
            assert parentCategory != null;
            return new ResponseModel(0, HttpStatus.OK,"1", new DetailPageDTO(similarProducts, entity, files, category.getName(), parentCategory.getName()));
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel update(Product entity) {
        try{
            System.out.println("ProductServiceImpl.update");
            Product product = productRepository.findById(entity.getId()).orElse(null);
            if(product == null){
                return new ResponseModel(ResponseFrontendDefine.CODE_NOT_FOUND, HttpStatus.BAD_REQUEST, "Not found!", null);
            }
            if(product.getFileIds()!=null){
                for(String fileId: product.getFileIds()){
                    fileService.deleteFile(fileId);
                }
            }
            List<UploadFile> tempFiles= List.copyOf(entity.getFiles());
            entity.setFiles(null);
            List<String> fileIds =new ArrayList<>();
            for (UploadFile tempFile : tempFiles) {
                MockMultipartFile mmf = Util.convertBase64ToMutilFile(tempFile);
                fileIds.add(fileService.addFile(mmf, tempFile.getNameFile()));
            }
            entity.setFileIds(fileIds);
            entity.setUpdatedAt(LocalDateTime.now());
            Product saveProduct=productRepository.save(entity);
            return new ResponseModel(0, HttpStatus.OK,"Update successful", saveProduct);
        }catch (Exception e){
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel delete(String id) {
        try{
            System.out.print("ProductServiceImpl.delete");
            Product product = productRepository.findById(id).orElse(null);
            if(product == null){
                return new ResponseModel(ResponseFrontendDefine.CODE_NOT_FOUND, HttpStatus.BAD_REQUEST, "Not found!", null);
            }
            if(product.getFileIds()!=null){
                for(String fileId: product.getFileIds()){
                    fileService.deleteFile(fileId);
                }
            }
            productRepository.deleteById(id);
            return new ResponseModel(0, HttpStatus.OK,"Delete successful", null);
        }catch (Exception e) {
            e.printStackTrace();
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel findByCategory(String category) {
        try{
            System.out.println("ProductServiceImpl.findByCategory");
            List<Product> products = productRepository.findByCategory(category);
            return new ResponseModel(0, HttpStatus.OK,"1", products);
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel findByNameContaining(String name) {
        try{
            System.out.println("ProductServiceImpl.findByNameContaining");
            List<Product> products = productRepository.findByNameContaining(name);
            return new ResponseModel(0, HttpStatus.OK,"1", products);
        }catch (Exception e) {
            throw handleException(e);
        }
    }

    @Override
    public ResponseModel doSearch(String keyword, String categoryId, int page, int perPage) {
        try{
            Pageable pageable = PageRequest.of(page, perPage);
            System.out.println("ProductServiceImpl.doSearch");
            Page<Product> products = productRepository.doSearch(keyword,  categoryId, pageable);
            for(Product product: products){
                if(product.getFileIds() != null&&!product.getFileIds().isEmpty()){
                    List<UploadFile> files = new ArrayList<>();
                    UploadFile file = fileService.downloadFile(product.getFileIds().get(0));
                    files.add(file);
                    product.setFiles(files);
                }
            }
            return new ResponseModel(0, HttpStatus.OK,"1", products.getContent(), products.getTotalElements());
        }
        catch (Exception e) {
            throw handleException(e);
        }
    }
}

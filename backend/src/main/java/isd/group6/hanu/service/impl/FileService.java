package isd.group6.hanu.service.impl;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import isd.group6.hanu.common.LoadFile;
import isd.group6.hanu.common.UploadFile;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Service
public class FileService {

    @Autowired
    private GridFsTemplate template;

    @Autowired
    private GridFsOperations operations;

    public String addFile(MultipartFile upload,String filename) throws IOException {

        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize", upload.getSize());

        Object fileID = template.store(upload.getInputStream(), filename, upload.getContentType(), metadata);

        return fileID.toString();
    }


    public UploadFile downloadFile(String id) throws IOException {

        GridFSFile gridFSFile = template.findOne( new Query(Criteria.where("_id").is(id)) );

        UploadFile loadFile = new UploadFile();

        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            loadFile.setNameFile( gridFSFile.getFilename() );
            loadFile.setContentType( gridFSFile.getMetadata().get("_contentType").toString() );
            loadFile.setData( Base64.getEncoder().encodeToString(IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream())) );
        }

        return loadFile;
    }

    public void deleteFile(String id) {
        template.delete(new Query(Criteria.where("_id").is(id)));
    }

}

package isd.group6.hanu.common;

import org.apache.tomcat.jni.FileInfo;
import org.springframework.core.io.Resource;
import org.springframework.mock.web.MockMultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

public class Util {

    public static MockMultipartFile convertBase64ToMutilFile(UploadFile fileInfo) throws Exception {
        MockMultipartFile mockMultipartFile = null;
        try{
            if(fileInfo != null){
                byte[] file = Base64.getDecoder().decode(fileInfo.getData());
                mockMultipartFile = new MockMultipartFile(fileInfo.getNameFile(), fileInfo.getNameFile(), fileInfo.getContentType(), file);

            }
            if(mockMultipartFile == null || mockMultipartFile.isEmpty()){
                throw new Exception("File không tồn tại");
            }
            return  mockMultipartFile;
        }catch (Exception ex){
            throw new Exception("Lỗi chuyển đổi file sang mutilFile");
        }
    }

    public static UploadFile convertResourceToBase64(Resource resource) throws Exception {
        UploadFile fileInfo =new UploadFile();
        byte[] bytes =null;
        try (InputStream is = resource.getInputStream();
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = is.read(buffer)) != -1) {
                baos.write(buffer, 0, bytesRead);
            }

            bytes = baos.toByteArray();
            if(bytes == null){
                throw new Exception("Lỗi đọc file");
            }

            fileInfo.setNameFile(resource.getFilename());
            fileInfo.setData(Base64.getEncoder().encodeToString(bytes));
            return fileInfo;
        } catch (IOException e) {
            e.printStackTrace();
            throw new Exception("Lỗi chuyển đổi resource sang base64");
        }

    }
}

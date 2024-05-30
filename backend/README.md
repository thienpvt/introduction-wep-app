## Lịch sử thay đổi project

| STT | Ngày       | Nội dung   | User   |
|:----|:-----------|:-----------|:-------|
| -   | --/--/---- | ---------- | ------ |


## Hướng dẫn khai báo ORM

Mô tả: Việc thiết kế call API theo các package trong Database.

Khi khai báo /orm

Nếu sử dụng method GET

Thì không sử dụng body khi gọi

Nếu sử dụng method POST, PUT, DELETE thì nên sử dụng theo request body

## Hướng dẫn build

Window: Maven + Java 17.

Yêu cầu: Cài đặt Maven trong đường dẫn Path của máy tính.

### Các bước chạy:

Bước 0: Mở Terminal:

Bước 1: cd ra thư mục gốc của project

Bước 2: Clean + build project: mvn clean install

```
Project tự động clean (xóa đi code cũ) + build (tạo file xxx.jar mới).
```

Bước 3: cd vào thư mục /target và chạy lệnh

|STT| Module         | Cách chạy                                                                                        |
|:---|:---------------|:-------------------------------------------------------------------------------------------------|
|1| Backend-Server | java -jar -Xmx256M -Xms64M <hanu-0.0.1-SNAPSHOT.jar> (tên trong ngoặc tùy thuộc vào tên project) |

## Flow dữ liệu qua các tầng

Mô hình: Controller <--DTO--> Service <--Model/mapper--> Repository <--Entity--> Database

Trong đó:

|STT|Thành phần|Giải thích|
|:---|:---|:---|
|1|Entity|Object ánh xác các trường trong Database. Đối với Database MySQL thì nên tự sinh ID trong Table, còn với Oracle thì nên đặt sequence|
|2|DTO|Data Transfer Object - tầng chuyển đổi dữ liệu ra ngoài Client/Controller|
|3|Mapper|Tầng convert dữ liệu từ Entity thành DTO|
|4|Request|Tầng chứa các Object request cho Controller|


Giải thích scope trong các tầng:

Entity > DTO > Request

### Môi trường cân chuẩn bị

Java 17 (Đã set JAVA_HOME)

### Build ứng dụng

command line: mvn clean install để build ứng dụng với các module maven.
other solution: sử dụng IDE (Eclipse, IntelliJ, Netbean) để build ứng dụng.

(... tài liệu hướng dẫn triển khai module)

WARNING...: Không sử dụng dependency devtool cho môi trường deploy lên Server

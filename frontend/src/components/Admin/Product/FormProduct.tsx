import { useEffect, useState } from "react";
import Select from "react-select";
import { Button, Form, Row } from "react-bootstrap";
import {
  useForm,
  SubmitHandler,
  Controller,
  useController,
  set,
} from "react-hook-form";
import api from "utils/api";
import { toast,Bounce } from "react-toastify";
import token from "plugins/token";
import notify from "utils/notify";

interface IFormInput {
  id: string;
  name: string;
  category: any;
  model: string;
  brand: any;
  description: any;
  createdAt: string;
  updatedAt: string;
}
export default function FormProduct({
  level1,
  level2,
  onActionSuccess,
  brand,
  data,
  type,
}: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      category: data.category,
      model: data.model,
      brand: data.brand,
      description: data.description?.join("; ")??data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    },
  });
  const [selectedLevel1, setSelectedLevel1] = useState<any>();
  const [optionLevel2, setOptionLevel2] = useState([]);
  const [booleanInit, setBooleanInit] = useState(true);
  const [images, setImages] = useState<FileList>();
  // const { field } = useController({ name: "category", control });
  // const {
  //   value: categoryValue,
  //   onChange: categoryOnChange,
  //   ...restCategoryField
  // } = field;
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if(data.description) data.description=data.description.split(";");
    // let content= new FormData();
    // content.append("product",new Blob([JSON.stringify(data)],{type:"application/json"}));
    // content.append("images",new Blob([JSON.stringify(data)],{type:"multipart/form-data"}));
    // console.log(content);
    // return
    switch (type) {
      case "add":
        await api
          .uploadFileAndData("product", data, images)
          .then((res) => {
            if (res?.code == 0) {
              notify.success("Thêm sản phẩm thành công");
              onActionSuccess();
            } else if (res?.code == 3) {
              notify.error("Sản phẩm đã tồn tại");
            }
          })
          .catch((e) => {
            notify.error("Lỗi hệ thống")
          });
        break;
      case "edit":
        await api
          .uploadFileAndData("product", data, images, "PUT")
          .then((res) => {
            if (res?.code == 0) {
              notify.success("Cập nhật sản phẩm thành công");
              onActionSuccess();
            }
          })
          .catch((e) => {
            notify.error("Lỗi hệ thống")
          });
        break;
    }
  };
  const handleUpload = (e: any) => {
    setImages(e.target.files);
    console.log(e.target.files);
  };
  useEffect(() => {
    if (selectedLevel1)
      setOptionLevel2(
        level2.filter((item: any) => item.parentId == selectedLevel1.value)
      );
    else setOptionLevel2([]);
    if (booleanInit) {
      setBooleanInit(false);
    }
  }, [selectedLevel1]);
  useEffect(() => {
    if (data && data.id) {
      setSelectedLevel1(() => {
        return level1.find(
          (item: any) =>
            item.value ==
            level2.find((item: any) => item.value == data.category).parentId
        );
      });
    }
  }, [data]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group
            className="mb-3 col-md-6 col-12"
            controlId="parentCategory">
            <Form.Label>Loại sản phẩm cấp 1</Form.Label>
            <Select
              id="parentCategory"
              placeholder="Chọn phân loại cấp 1"
              noOptionsMessage={() => "Không có dữ liệu"}
              isClearable
              controlShouldRenderValue={true}
              options={level1}
              onChange={(option: any) => {
                setSelectedLevel1(option);
              }}
              value={selectedLevel1}
              isDisabled={type == "view"}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-6 col-12" controlId="category">
            <Form.Label>Loại sản phẩm cấp 2</Form.Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Loại sản phẩm không được để trống" }}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  options={optionLevel2}
                  value={
                    field.value
                      ? optionLevel2.find((x: any) => x.value === field.value)
                      : field.value
                  }
                  onChange={(option: any) =>
                    field.onChange(option ? option.value : option)
                  }
                  placeholder="Chọn phân loại cấp 2"
                  noOptionsMessage={() => "Không có dữ liệu"}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      borderColor: errors.category ? "red" : styles.borderColor,
                    }),
                  }}
                  isDisabled={type == "view"}
                />
              )}
            />
            {errors.category && (
              <p className="text-danger">
                {errors.category.message?.toString()}
              </p>
            )}
            {/* <Select
              id="category"
              placeholder="Chọn phân loại cấp 2"
              noOptionsMessage={() => "Không có dữ liệu"}
              isClearable
              options={optionLevel2}
              value={
                categoryValue
                  ? optionLevel2.find((x: any) => x.value === categoryValue)
                  : categoryValue
              }
              onChange={(option: any) =>
                categoryOnChange(option ? option.value : option)
              }
              {...restCategoryField}
            /> */}
          </Form.Group>
          <Form.Group className="mb-3 col-md-6 col-12" controlId="name">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Tên sản phẩm không được để trống",
                maxLength: {
                  value: 255,
                  message: "Tên sản phẩm không được quá 255 ký tự",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                  className={errors.name && "border-danger"}
                  disabled={type == "view"}
                />
              )}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message?.toString()}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3 col-md-6 col-12" controlId="model">
            <Form.Label>MODEL</Form.Label>
            <Controller
              name="model"
              control={control}
              rules={{
                required: "MODEL không được để trống",
                maxLength: {
                  value: 255,
                  message: "MODEL không được quá 255 ký tự",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Nhập mã MODEL"
                  {...field}
                  className={errors.model && "border-danger"}
                  disabled={type == "view"}
                />
              )}
            />
            {errors.model && (
              <p className="text-danger">{errors.model.message?.toString()}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3 col-md-6 col-12" controlId="brand">
            <Form.Label>Thương hiệu</Form.Label>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="brand"
                  placeholder="Chọn thương hiệu"
                  noOptionsMessage={() => "Không có dữ liệu"}
                  isClearable
                  options={brand}
                  isDisabled={type == "view"}
                />
              )}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-12" controlId="description">
            <Form.Label>
              Mô tả (Mô tả có dạng "Thuộc tính: mô tả chi tiết" và cách nhau bởi
              dấu ";")
            </Form.Label>
            <Controller
              name="description"
              control={control}
              rules={{
                maxLength: {
                  value: 1000,
                  message: "Mô tả không được quá 1000 ký tự",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Nhập mô tả"
                  {...field}
                  className={errors.description && "border-danger"}
                  disabled={type == "view"}
                />
              )}
            />
            {errors.description && (
              <p className="text-danger">
                {errors.description.message?.toString()}
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-3 col-md-6 col-12" controlId="images">
            <Form.Label>Ảnh</Form.Label>

            <Form.Control
              type="file"
              accept="image/*"
              placeholder="Chọn hình ảnh"
              onChange={handleUpload}
              multiple
              disabled={type == "view"}
            />
          </Form.Group>
          <div className="w-100 d-flex flex-wrap ">
            {images
              ? Array.from(images).map((item: any, index: number) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(item)}
                    alt=""
                    className="img-thumbnail m-1"
                    style={{ width: "250px", height: "250px" }}
                  />
                ))
              : data.files?.length > 0
              ? data.files.map((item: any, index: number) => (
                  <img
                    key={index}
                    src={`data:${item.contentType};base64,${item.data}`}
                    alt=""
                    className="img-thumbnail m-1"
                    style={{ width: "250px", height: "250px" }}
                  />
                ))
              : ""}
          </div>
        </Row>
        {type != "view" && (
          <div className="text-center">
            <Button variant="primary" type="submit">
              {type == "add" ? "Thêm mới" : "Sửa"}
            </Button>{" "}
          </div>
        )}
      </Form>
    </>
  );
}

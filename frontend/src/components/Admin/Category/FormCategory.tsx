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
import { toast } from "react-toastify";
import token from "plugins/token";
import notify from "utils/notify";

interface IFormInput {
  id: string;
  parentId: any;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  level:string;
}
export default function FormCategory({
  level1,
  onActionSuccess,
  data,
  type,
}: any) {
  const { control, handleSubmit, formState: { errors },} = useForm({
    defaultValues: {
      id: data.id,
      parentId: data.parentId,
      name: data.name,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      level:data.level
    },
  });

  const { field } = useController({ name: "parentId", control });
  const {
    value: parentIdValue,
    onChange: parentIdOnChange,
    ...restParentIdField
  } = field;
  const onSubmit: SubmitHandler<IFormInput> =async (data) => {
    // let content= new FormData();
    // content.append("product",new Blob([JSON.stringify(data)],{type:"application/json"}));
    // content.append("images",new Blob([JSON.stringify(data)],{type:"multipart/form-data"}));
    // console.log(content);
    // return
    switch (type) {
      case "add":
        await api
          .post("category", data)
          .then((res) => {
            if (res?.code == 0) {
              notify.success("Thêm loại sản phẩm thành công");
              onActionSuccess();
            } else if (res?.code == 3) {
              notify.error("Loại sản phẩm đã tồn tại");
            }
          })
          .catch((e) => {
            console.log(e);
            notify.error("Lỗi hệ thống")
          });
        break;
      case "edit":
        await api
          .put("category", data)
          .then((res) => {
            if (res?.code == 0) {
              notify.success("Cập nhật loại sản phẩm thành công");
              onActionSuccess();
            }
          })
          .catch((e) => {
            notify.error("Lỗi hệ thống")
          });
        break;
    }

  };
  
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group className="mb-3 col-md-6 col-12" controlId="parentId">
            <Form.Label>Phân loại cấp 1</Form.Label>

            <Controller
              name="parentId"
              control={control}
              rules={{ required: "Phân loại cấp 1 không được để trống" }}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  options={level1}
                  value={
                    field.value
                      ? level1.find((x: any) => x.value === field.value)
                      : field.value
                  }
                  onChange={(option: any) =>
                    field.onChange(option ? option.value : option)
                  }
                  placeholder="Chọn phân loại cấp 1"
                  noOptionsMessage={() => "Không có dữ liệu"}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      borderColor: errors.parentId ? "red" : styles.borderColor,
                    }),
                  }}
                  isDisabled={type == "view"}
                />
              )}
            />
            {errors.parentId && (
              <p className="text-danger">{errors.parentId.message?.toString()}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3 col-md-6 col-12" controlId="name">
            <Form.Label>Tên loại sản phẩm</Form.Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Tên loại sản phẩm không được để trống" ,maxLength: {value: 255, message: "Tên loại sản phẩm không được vượt quá 255 ký tự"}}}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Nhập tên loại sản phẩm"
                  {...field}
                  className={errors.name && "border-danger"}
                  disabled={type == "view"}
                />
              )}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message?.toString()}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3 col-md-6 col-12" controlId="status">
            <Form.Label>Trạng thái</Form.Label>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Vui lòng chọn trạng thái" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: 1, label: "Kích hoạt" },
                    { value: 0, label: "Không kích hoạt" },
                  ]}
                  value={
                    field.value ==1
                      ? { value: 1 ,label: "Kích hoạt" }
                      : { value: 0 ,label: "Không kích hoạt" }
                  }
                  onChange={(option: any) =>
                    field.onChange(option ? option.value : option)
                  }
                  placeholder="Chọn trạng thái"
                  noOptionsMessage={() => "Không có dữ liệu"}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      borderColor: errors.status ? "red" : styles.borderColor,
                    }),
                  }}
                  isDisabled={type == "view"}
                />
              )}
            />
            {errors.status && (
              <p className="text-danger">{errors.status.message?.toString()}</p>
            )}
          </Form.Group>
          
        </Row>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>{" "}
        </div>
      </Form>
    </>
  );
}

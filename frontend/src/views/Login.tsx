import token from "plugins/token";
import { Button, Card, CardText, Col, Form, Row } from "react-bootstrap";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "utils/api";
import notify from "utils/notify";
interface IFormInput {
  username: string;
  password: any;
}
export default function Login() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data);
  };
  const login = async (data: any) => {
    try {
      await api.post("/auth/login", data).then((res) => {
        if (res.code == 0) {
          navigate("/admin/product");
          notify.success("Đăng nhập thành công");
          token.setToken(res.content.Bearer);
        } else {
          notify.error("Đăng nhập thất bại");
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <style type="text/css">
        {`
          .auth-wrapper {
               min-block-size: 100dvh;
               
          } 
          .bg-background {
               --v-theme-overlay-multiplier: var(--v-theme-background-overlay-multiplier);
               background-color: rgb(var(--v-theme-background)) !important;
               color: rgb(var(--v-theme-on-background)) !important;
               margin-inline-end: 0px;
           }
          .bg-surface {
                    --v-theme-overlay-multiplier: var(--v-theme-surface-overlay-multiplier);
                    background-color: rgb(var(--v-theme-surface)) !important;
                    color: rgb(var(--v-theme-on-surface)) !important;
                    
               }
               .m-8{
                    margin:32px;
                    margin-inline-end: 0px !important;
               }
        `}
      </style>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="bg-surface auth-wrapper">
          <Col sm={8} className="d-none d-lg-flex ">
            <div className="position-relative bg-background rounded-3 w-100 m-8">
              <div className="d-flex align-items-center justify-content-center w-100 h-100"></div>
            </div>
          </Col>
          <Col
            sm={4}
            className="d-flex align-items-center justify-content-center">
            <Card style={{ width: "335px" }}>
              <Card.Body>
                <CardText>
                  <span className="text-h4 mb-1">Đăng nhập</span>
                </CardText>

                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Tài khoản đăng nhập</Form.Label>
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: "Tài khoản không được để trống",
                      pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Tài khoản chỉ chứa chữ và số",
                      },
                      minLength: {
                        value: 6,
                        message: "Tài khoản phải lớn hơn 6 ký tự",
                      },
                      maxLength: {
                        value: 20,
                        message: "Tài khoản phải nhỏ hơn 20 ký tự",
                      },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        type="text"
                        placeholder="Nhập tài khoản"
                        {...field}
                        className={errors.username && "border-danger"}
                      />
                    )}
                  />
                  {errors.username && (
                    <Form.Text className="text-danger">
                      {errors.username.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Mật khẩu không được để trống",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message:
                          "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 8 ký tự",
                      },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu"
                        autoComplete=""
                        {...field}
                        className={errors.password && "border-danger"}
                      />
                    )}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Đăng nhập
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
}

import { useEffect, useMemo, useState } from "react";
import api from "utils/api";
import VerticalNavbar from "layouts/Admin/VerticalNavbar";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import token from "plugins/token";

export default function Admin() {
  const [username, setUsername] = useState<string | undefined>("");
  // const fetchTest = async () => {
  //   try {
  //     const res = await api.post("blackpink", {
  //       configId: 1,
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log("Failed to fetch dropdown items:", error);
  //   }
  // };
  useEffect(() => {
    let decode = token.getClaims();
    !decode && redirect("/login");
    setUsername(decode?.sub);
  }, [token.getTokenFromStorage()]);

  return (
    <Container>
      <VerticalNavbar username={username} />
      <div style={{ paddingTop: "100px" }}>
        <Outlet />
      </div>
    </Container>
  );
}

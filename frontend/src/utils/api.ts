import axios from "axios";
import token from "../plugins/token";
import ultilsService from "./ultils-service";
import { Navigate, useNavigate } from "react-router-dom";
import router from "routes";
function handleError(e: any) {
  if (e.response.status == 401) token.clearToken();
  router.navigate("/login");
}
export default {
  getOriginal() {
    var instance = axios.create();
    instance.interceptors.request.use((request) => {
      request.baseURL = process.env.REACT_APP_API_BASE_URL || "/api";
      request.headers["Content-Type"] = "application/json";
      return request;
    });
    return instance;
  },
  async get(url: string, params: any = {}) {
    var r = await this.getOriginal().get(url, { params });
    return r.data;
  },
  postOriginal() {
    var instance = axios.create();
    instance.interceptors.request.use((request) => {
      request.baseURL = process.env.REACT_APP_API_BASE_URL || "/api";
      request.headers["Authorization"] = token.getTokenFromStorage();
      return request;
    });
    instance.interceptors.response.use((response) => {
      if (response.data.code == 401) {
        console.log("Token expired");
        token.clearToken();
      }
      return response;
    });
    return instance;
  },
  async post(url: string, data: any = {}, config: any = {}) {
    var r = await this.postOriginal()
      .post(url, data)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        handleError(e);
      });
    return r;
  },
  async put(url: string, data: any = {}) {
    var r = await this.postOriginal()
      .put(url, data)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        handleError(e);
      });
    return r;
  },
  async patch(url: string, data: any = {}) {
    var r = await this.postOriginal()
      .patch(url, data)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        handleError(e);
      });
    return r;
  },
  async delete(url: string) {
    var r = await this.postOriginal()
      .delete(url)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        handleError(e);
      });
    return r;
  },
  async uploadFileAndData(
    url: string,
    data: any = {},
    files: any,
    method: string = "POST"
  ) {
    let filesUpload = [];
    if (files)
      for (var i = 0; i < files.length; i++) {
        const base64Value = await ultilsService.convertFileToBase64(files[i]);
        let fileData: any = {
          data: null,
          nameFile: null,
          contentType: null,
        };
        fileData.data = base64Value;
        fileData.nameFile = files[i].name;
        fileData.contentType = files[i].type;
        filesUpload.push(fileData);
      }
    data.files = filesUpload;
    let config = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    var r = null;
    switch (method) {
      case "POST":
        r = await this.postOriginal()
          .post(url, data, config)
          .then((res) => {
            return res.data;
          })
          .catch((e) => {
            handleError(e);
          });
        break;
      case "PUT":
        r = await this.postOriginal()
          .put(url, data, config)
          .then((res) => {
            return res.data;
          })
          .catch((e) => {
            handleError(e);
          });
        break;
      case "PATCH":
        r = await this.postOriginal()
          .patch(url, data, config)
          .then((res) => {
            return res.data;
          })
          .catch((e) => {
            handleError(e);
          });
        break;
      case "DELETE":
        r = await this.postOriginal().delete(url,config).then((res) => {
          return res.data;
        }).catch((e) => {
          handleError(e);
        });
    }
    return r;
  },
};

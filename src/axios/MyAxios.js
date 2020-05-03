import axios from "axios";
import store from "@/store/index";
import { author } from "@/utils/Const";
import { GET_EXCEPTION } from "@/store/types";
//单独开发vue时使用
axios.defaults.baseURL = "/api/";
//vue与后端springboot联调时使用
// axios.defaults.baseURL = "http://localhost:8080/api/";

//请求拦截器
axios.interceptors.request.use(
  req => {
    //正确 日后补充头里加信息
    //作为“日后”来补信息了
    let auth = sessionStorage.getItem(author);
    if (auth != null) {
      req.headers[author] = auth;
    }
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);
//响应拦截器
axios.interceptors.response.use(
  resp => {
    //返回200
    return resp;
  },
  error => {
    console.log("响应失败");
    let resp = error.response;
    if (resp) {
      switch (resp.status) {
        case 401:
          //可基于响应码，声明单独的处理
          break;
      }
      //使用同步事件，统一将任意异常信息，置于sotre
      store.commit(GET_EXCEPTION, { message: resp.data.message });
    }
    //之前认为我们已经做了错误处理 放行但不返回响应对象 所以store.index的resp一定要判断是否为空
    //为防止每次返回结果都要判断，我们用了下面的方法。
    // return Promise.resolve();
    //可以阻止调用方法继续执行，但控制台有异常信息说你未捕获异常。
    return Promise.reject();
  }
);

export default axios;

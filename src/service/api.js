import router from "../router/index";
const url=`${import.meta.env.VITE_API_JAVAURL}`
//引用原本的axios
import axios from "axios";
// axios.defaults.baseURL = url;
// axios.defaults.withCredentials = true;
//改寫一個axios方法 自帶請求頭
const CookieAxios = axios.create({
  baseURL:url,
});

// axios.defaults.baseURL = '';
// axios.defaults.withCredentials = false;
//改寫原本的axios請求
CookieAxios.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);
//改寫原本的axios回傳，收到401跳轉登入頁面
CookieAxios.interceptors.response.use(
  (response) => {
    if (response.config.url.includes("/login") && response.status === 200) {
      localStorage.setItem("loggedIn", "true");
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
       localStorage.setItem("loggedIn", "false");
      router.push("/login");
    }
    return Promise.reject(error.response.status + ":" + error.response.data);
  }
);
//匯出改寫方法(CookieAxios)以及原本方法(axios)
export { CookieAxios, axios };

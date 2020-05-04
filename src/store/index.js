import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import axios from "@/axios/MyAxios";
import { author } from "../utils/Const";
import { updateRoutes } from "@/router/index";

Vue.use(Vuex);

const myState = {
  exception: { message: null },
  isLogin: false,
  isUpdatePwd: false,
  tutor: null
  // courses: null
};
const myMutations = {
  [types.GET_EXCEPTION](state, data) {
    state.exception = data;
  },
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.UPDATE_PWD](state, data) {
    state.isUpdatePwd = data;
  },
  tutor(state, data) {
    state.tutor = data;
  }
  // courses(state, data) {
  //   state.courses = data;
  // }
};
const myActions = {
  //登录
  async [types.LOGIN]({ commit }, data) {
    let resp = await axios.post("login", data);
    if (resp != null) {
      console.log(resp);
      sessionStorage.setItem(author, resp.headers[author]);
      sessionStorage.setItem("role", resp.data.role);
      updateRoutes();
      commit(types.LOGIN, true);
    }
  },
  async backendindex({ commit }) {
    let resp = await axios.get("tutor/index");
    commit("tutor", resp.data.tutor);
    // commit("courses", resp.data.courses);
  },
  async [types.UPDATE_PWD]({ commit }, data) {
    let resp = await axios.patch("updatePwd", data);
    commit(types.UPDATE_PWD, true);
  }
};
export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

//执行时判断，刷新时检测(是否之前已经登陆过)
if (sessionStorage.getItem(author) != null) {
  myState.isLogin = true;
}

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
  isUpdateNote: false,
  isUpdateDirections: false,
  tutor: null,
  directions: null,
  tcourses: null
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
  [types.UPDATE_NOTE](state, data) {
    state.isUpdateNote = data;
  },
  [types.UPDATE_DIRECTIONS](state, data) {
    state.isUpdateDirections = data;
  },
  tutor(state, data) {
    state.tutor = data;
  },
  directions(state, data) {
    state.directions = data;
  },
  tcourses(state, data) {
    state.tcourses = data;
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
  async coursesindex({ commit }) {
    let resp = await axios.get("tutor/index");
    commit("tcourses", resp.data.course);
    // commit("courses", resp.data.courses);
  },
  async directionsindex({ commit }) {
    let resp = await axios.get("directions");
    commit("directions", resp.data.directions);
  },
  async [types.UPDATE_PWD]({ commit }, data) {
    let resp = await axios.patch("updatePwd", data);
    commit(types.UPDATE_PWD, true);
  },
  async [types.UPDATE_NOTE]({ commit }, data) {
    let resp = await axios.patch("tutor/settings", data);
    commit(types.UPDATE_NOTE, true);
  },
  async [types.UPDATE_DIRECTIONS]({ commit }, data) {
    let resp = await axios.post("tutor/updateDirections", data);
    commit(types.UPDATE_DIRECTIONS, true);
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

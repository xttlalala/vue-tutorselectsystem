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
  isBuildStudents: false,
  isDeleteCourse: false,
  isAddCourse: false,
  isUpdateCourse: false,
  addSDirection: false,
  studentUsers: null,
  tutor: null,
  directions: null,
  tcourses: null,
  mystudents: null,
  gotStudent: null,
  student: null,
  stutor: null,
  tutors: null,
  choose: 2
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
  [types.DELETE_COURSE](state, data) {
    state.isDeleteCourse = data;
  },
  [types.ADD_COURSE](state, data) {
    state.isAddCourse = data;
  },
  [types.UPDATE_COURSE](state, data) {
    state.isUpdateCourse = data;
  },
  [types.BUILD_STUDENT](state, data) {
    state.isBuildStudents = data;
  },
  [types.ADD_STUDENT](state, data) {
    state.gotStudent = data;
  },
  [types.CHOOSE_TUTOR](state, data) {
    state.choose = data;
  },
  [types.ADD_SDIRECTION](state, data) {
    state.addSDirection = data;
  },
  tutor(state, data) {
    state.tutor = data;
  },
  directions(state, data) {
    state.directions = data;
  },
  tcourses(state, data) {
    state.tcourses = data;
  },
  mystudents(state, data) {
    state.mystudents = data;
  },
  student(state, data) {
    state.student = data;
  },
  stutor(state, data) {
    state.stutor = data;
  },
  tutors(state, data) {
    state.tutors = data;
  },
  studentUsers(state, data) {
    state.studentUsers = data;
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
  async mystudentsindex({ commit }) {
    let resp = await axios.get("tutor/index");
    commit("mystudents", resp.data.students);
  },
  async studentindex({ commit }) {
    let resp = await axios.get("studentindex");
    commit("student", resp.data.student);
    commit("stutor", resp.data.tutorname);
  },
  async excuteStudent({ commit }) {
    let resp = await axios.get("tutor/excuteStudent");
    commit("studentUsers", resp.data.studentUsers);
  },
  async tutorsindex({ commit }) {
    let resp = await axios.get("tutorsindex");
    commit("tutors", resp.data.tutors);
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
  },
  async [types.DELETE_COURSE]({ commit }, data) {
    let resp = await axios.post("tutor/deleteCourse", data);
    commit(types.DELETE_COURSE, true);
  },
  async [types.ADD_COURSE]({ commit }, data) {
    let resp = await axios.post("tutor/addcourse", data);
    commit(types.ADD_COURSE, true);
  },
  async [types.UPDATE_COURSE]({ commit }, data) {
    let resp = await axios.patch("tutor/updateCourse", data);
    commit(types.UPDATE_COURSE, true);
  },
  async [types.BUILD_STUDENT]({ commit }, data) {
    let resp = await axios.post("tutor/buildStudent", data);
    commit(types.BUILD_STUDENT, true);
  },
  async [types.ADD_STUDENT]({ commit }, data) {
    let resp = await axios.post("tutor/addStudent", data);
    commit(types.ADD_STUDENT, resp.data.student);
  },
  async [types.CHOOSE_TUTOR]({ commit }, data) {
    let resp = await axios.post("choice", data);
    commit(types.CHOOSE_TUTOR, resp.data.choose);
  },
  async [types.ADD_SDIRECTION]({ commit }, data) {
    await axios.post("addSDirection", data);
    commit(types.ADD_SDIRECTION, true);
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

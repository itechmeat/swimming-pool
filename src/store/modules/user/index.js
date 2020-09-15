import { Auth } from "aws-amplify";
import axios from "axios";

import * as TYPES from "./types";

const namespaced = true;

const state = () => ({
  isLoading: false,
  isAuthFormActive: false,
  authState: undefined,
  user: undefined,
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_AUTH_FORM_STATE]: (state) => state.isAuthFormActive,
  [TYPES.GET_USER]: (state) => state.user,
  [TYPES.GET_AUTH]: (state) => state.authState,
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_USER]: (state, payload) => {
    state.user = payload;
  },

  [TYPES.SET_AUTH_FORM_STATE]: (state, payload) => {
    state.isAuthFormActive = payload;
  },

  [TYPES.SET_AUTH]: (state, payload) => {
    state.authState = payload;
  },
};

const actions = {
  async regUser({ commit }, data) {
    commit("SET_LOADING", true);
    try {
      const response = await axios.post("auth/register", data);
      commit("SET_USER", {});
    } catch (err) {
      commit("SET_LOADING", false);
    }
  },

  async login({ commit }, data) {
    commit("SET_LOADING", true);
    try {
      const response = await axios.post("auth/login", data);
      commit("SET_USER", {});
      commit("SET_LOADING", false);
    } catch (err) {
      console.log("catch");
      commit("SET_LOADING", false);
      commit("SET_USER", null);
    }
  },

  async signOut({ commit }) {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
    commit("SET_USER", null);
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};

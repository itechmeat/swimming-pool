import Amplify, { API, graphqlOperation } from "@aws-amplify/api";
import { Auth } from "aws-amplify";
import awsConfig from "src/aws-exports";
import { createProfile } from "src/graphql/mutations";
import { getProfile } from "src/graphql/queries";
Amplify.configure(awsConfig);

import * as TYPES from "./types";

const namespaced = true;

const state = () => ({
  isLoading: false,
  isAuthFormActive: false,
  authState: undefined,
  user: undefined,
  profiles: [],
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_AUTH_FORM_STATE]: (state) => state.isAuthFormActive,
  [TYPES.GET_USER]: (state) => state.user,
  [TYPES.GET_AUTH]: (state) => state.authState,

  [TYPES.IS_ADMIN]: (state) => {
    if (!state.user || !state.user.signInUserSession) {
      return;
    }
    return state.user.signInUserSession.accessToken.payload["cognito:groups"].includes("admins")
  },
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

  [TYPES.SET_PROFILE]: (state, payload) => {
    state.profiles.push(payload);
  },
};

const actions = {
  async signOut({ commit }) {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
    commit("SET_USER", null);
  },

  async createProfile({ commit, dispatch }, profile) {
    commit("SET_LOADING", true);

    try {
      const { data } = await API.graphql(
        graphqlOperation(createProfile, { input: profile })
      );

      commit("SET_LOADING", false);
      return data;
    } catch (error) {
      console.log('createProfile', error)
      commit("SET_LOADING", false);
      return false;
    }
  },

  async fetchProfile({ commit }, id) {
    try {
      const { data } = await API.graphql(graphqlOperation(getProfile, { id }));
      return data.getProfile;
    } catch(error) {
      console.log('profile', error)
      return false;
    }
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};

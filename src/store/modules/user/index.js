import Amplify, { API, graphqlOperation } from "@aws-amplify/api";
import { Auth } from "aws-amplify";
import awsConfig from "src/aws-exports";
import { createProfile } from "src/graphql/mutations";
import { getProfile, listProfiles } from "src/graphql/queries";
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

  [TYPES.GET_PROFILES]: (state) => state.profiles,
  [TYPES.GET_PROFILE_BY_ID]: (state) => (id) => state.profiles.find((profile) => profile.id === id),
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

  async fetchProfiles() {
    try {
      let result
      await API.graphql(graphqlOperation(listProfiles, { limit: 200 })).then((evt) => {
        result = evt.data.listProfiles.items;
      });
      return result;
    } catch (error) {
      console.error(error)
      return [];
    }
  },

  async fetchProfile({ commit, state }, id) {
    if (!id) {
      return;
    }

    const profile = state.profiles.find((item) => item.id === id);

    if (profile) {
      return profile;
    }

    try {
      const { data } = await API.graphql(graphqlOperation(getProfile, { id }));
      if (!data.getProfile) {
        return null;
      }
      commit("SET_PROFILE", data.getProfile);
      return data.getProfile;
    } catch(error) {
      console.error('profile', error);
      return null;
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

import Amplify, { API, graphqlOperation } from "@aws-amplify/api";
import awsConfig from "src/aws-exports";
import { createEvent } from "src/graphql/mutations";
import { listEvents } from "src/graphql/queries";
// import { onCreateEvent } from "src/graphql/subscriptions";
Amplify.configure(awsConfig);

import * as TYPES from "./types";

const namespaced = true;

const state = () => ({
  isLoading: false,
  events: [],
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_EVENTS]: (state) => state.events,
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_EVENTS]: (state, payload) => {
    state.events = payload;
  },
};

const actions = {
  fetchEvents({ commit }) {
    commit("SET_LOADING", true);

    try {
      API.graphql(graphqlOperation(listEvents)).then((evt) => {
        commit("SET_EVENTS", evt.data.listEvents.items);
        commit("SET_LOADING", false);
      });
    } catch (err) {
      commit("SET_LOADING", false);
    }
  },

  async createEvent({ commit, dispatch }, event) {
    commit("SET_LOADING", true);
    try {
      await API.graphql(
        graphqlOperation(createEvent, { input: event })
      );

      dispatch("fetchEvents");
      commit("SET_LOADING", false);
    } catch (e) {
      commit("SET_LOADING", false);
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

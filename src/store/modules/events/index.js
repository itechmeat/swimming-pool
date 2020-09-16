import Amplify, { API, graphqlOperation } from "@aws-amplify/api";
import awsConfig from "src/aws-exports";
import { createEvent, updateEvent, deleteEvent } from "src/graphql/mutations";
import { listEvents } from "src/graphql/queries";
import { onCreateEvent, onUpdateEvent, onDeleteEvent } from "src/graphql/subscriptions";
Amplify.configure(awsConfig);
import { date } from "quasar";
import { resolveEvent } from "src/libs/events"

import * as TYPES from "./types";

const namespaced = true;
const evtDate = (stamp) => date.formatDate(stamp, "YYYY-MM-DD");

const state = () => ({
  isLoading: false,
  events: [],
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_EVENTS]: (state) => state.events,
  [TYPES.GET_EVENT_BY_ID]: (state) => (id) => state.events.find((evt) => evt.id === id),

  [TYPES.IS_EVENT_RESERVED]: (state, getters, rootState) => (id) => {
    if (!rootState.user.user) {
      return;
    }
    const event = state.events.find((evt) => evt.id === id);
    return event.visitors.includes(rootState.user.user.username);
  },

  [TYPES.IS_DAY_RESERVED]: (state, getters, rootState) => (targetDate) => state.events.some((evt) => {
    if (!rootState.user.user) {
      return;
    }
    return evtDate(evt.datestamp) === targetDate && evt.visitors.includes(rootState.user.user.username);
  }),
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_EVENTS]: (state, payload) => {
    state.events = payload;
  },

  [TYPES.ADD_EVENT]: (state, payload) => {
    state.events.push(payload);
  },

  [TYPES.UPDATE_EVENT]: (state, payload) => {
    const index = state.events.findIndex((item) => item.id === payload.id)
    state.events.splice(index, 1, payload);
  },

  [TYPES.DELETE_EVENT]: (state, payload) => {
    const index = state.events.findIndex((item) => item.id === payload.id)
    state.events.splice(index, 1);
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
      return true;
    } catch (err) {
      commit("SET_LOADING", false);
      return false;
    }
  },

  async createEvent({ commit, dispatch, rootState }, event) {
    commit("SET_LOADING", true);

    const usersEvent = {
      ...resolveEvent(event),
      author: rootState.user.user.username,
    };

    try {
      await API.graphql(
        graphqlOperation(createEvent, { input: usersEvent })
      );

      dispatch("fetchEvents");
      commit("SET_LOADING", false);
      return true;
    } catch (e) {
      commit("SET_LOADING", false);
      return false;
    }
  },

  async updateEvent({ commit }, event) {
    commit("SET_LOADING", true);
    try {
      await API.graphql(
        graphqlOperation(updateEvent, { input: resolveEvent(event) })
      );

      commit("SET_LOADING", false);
      return true;
    } catch (e) {
      console.error(e);
      commit("SET_LOADING", false);
      return false;
    }
  },

  async deleteEvent({ commit }, event) {
    commit("SET_LOADING", true);
    try {
      await API.graphql(
        graphqlOperation(deleteEvent, { input: event })
      );

      commit("SET_LOADING", false);
      return true;
    } catch (e) {
      console.error(e);
      commit("SET_LOADING", false);
      return false;
    }
  },

  async subscribe({ commit }) {
    try {
      API.graphql(graphqlOperation(onCreateEvent)).subscribe({
        next: (evt) => {
          commit("ADD_EVENT", evt.value.data.onCreateEvent);
        },
      });

      API.graphql(graphqlOperation(onUpdateEvent)).subscribe({
        next: (evt) => {
          commit("UPDATE_EVENT", evt.value.data.onUpdateEvent);
        },
      });

      API.graphql(graphqlOperation(onDeleteEvent)).subscribe({
        next: (evt) => {
          commit("DELETE_EVENT", evt.value.data.onDeleteEvent);
        },
      });
    } catch (e) {
      console.error(e)
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

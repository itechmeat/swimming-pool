<template>
  <div>
    <h5>Mutation Results</h5>
    <button @click="add">Add data</button>
    <div id="MutationResult" v-html="MutationResult" />
    <hr />

    <h5>Query Results</h5>
    <div id="QueryResult" v-html="QueryResult" />
    <hr />

    <h5>Subscription Results</h5>
    <div id="SubscriptionResult" v-html="SubscriptionResult" />
  </div>
</template>

<script>
import Amplify, { API, graphqlOperation } from "@aws-amplify/api";
import awsConfig from "src/aws-exports";
import { createTodo } from "src/graphql/mutations";
import { listTodos } from "src/graphql/queries";
import { onCreateTodo } from "src/graphql/subscriptions";
Amplify.configure(awsConfig);

export default {
  name: "GraphQLapi",

  data() {
    return {
      todos: null,
      MutationResult: "",
      QueryResult: "",
      SubscriptionResult: "",
    };
  },

  mounted() {
    this.getData();
    this.subscribe();
  },

  methods: {
    async getData() {
      API.graphql(graphqlOperation(listTodos)).then((evt) => {
        evt.data.listTodos.items.map((todo, i) => {
          this.QueryResult += `<p>${todo.name} - ${todo.description} [${i}]</p>`;
        });
      });
    },

    async subscribe() {
      API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next: (evt) => {
          const todo = evt.value.data.onCreateTodo;
          this.SubscriptionResult += `<p>${todo.name} - ${todo.description}</p>`;
        },
      });
    },

    async createNewTodo() {
      const todo = {
        name: "Use AppSync",
        description: `Realtime and Offline (${new Date().toLocaleString()})`,
      };

      this.todos = await API.graphql(
        graphqlOperation(createTodo, { input: todo })
      );

      return this.todos;
    },

    async add() {
      await this.createNewTodo().then((evt) => {
        console.log("@@@", evt);
        this.MutationResult += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$block: ".block";

#{$block} {
}
</style>

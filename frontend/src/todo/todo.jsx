import React from "react";
import PageHeader from "../templates/pageHeader";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import "../templates/custom.css";

const Todo = (props) => (
  <div className="container">
    <PageHeader name="Tarefas" small="Cadastro"></PageHeader>
    <TodoForm></TodoForm>
    <TodoList></TodoList>
  </div>
);

export default Todo;

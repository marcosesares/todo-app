import React, { Component } from "react";
import axios from "axios";
import PageHeader from "../templates/pageHeader";
import TodoForm from "./todoForm";
import TodoList from "./todoList";

const URL = "http://localhost:3003/api/todos";
export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", list: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.refresh();
  }

  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value });
  }

  refresh() {
    axios.get(`${URL}?sort=createdAt`).then((response) => {
      console.log(
        this.setState({ ...this.state, description: "", list: response.data })
      );
    });
  }

  handleRemove() {
    axios.delete(`${URL}/${todo.id}`).then((response) => this.refresh());
  }

  handleAdd() {
    const description = this.state.description;
    axios.post(URL, { description }).then((response) => this.refresh());
  }

  render() {
    return (
      <div className="container">
        <PageHeader name="Tarefas" small="Cadastro"></PageHeader>
        <TodoForm
          handleAdd={this.handleAdd}
          description={this.state.description}
          handleChange={this.handleChange}
          handleRemove={this.handleRemove}
        ></TodoForm>
        <TodoList list={this.state.list}></TodoList>
      </div>
    );
  }
}

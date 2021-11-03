import React, { Component } from "react";
import axios from "axios";
import PageHeader from "../templates/pageHeader";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import "../templates/custom.css";

const URL = "http://localhost:3003/api/todos";
export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", list: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.refresh();
  }

  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value });
  }

  refresh(description = "") {
    const search = description ? `&description__regex=/${description}/` : "";
    axios.get(`${URL}?sort=createdAt${search}`).then((response) => {
      this.setState({ ...this.state, description, list: response.data });
    });
  }

  handleSearch() {
    this.refresh(this.state.description);
  }

  handleClear() {
    this.refresh();
  }

  handleMarkAsPending(todo) {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then((response) => this.refresh(this.state.description));
  }

  handleMarkAsDone(todo) {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then((response) => this.refresh(this.state.description));
  }

  handleRemove(todo) {
    axios
      .delete(`${URL}/${todo._id}`)
      .then((response) => this.refresh(this.state.description));
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
          handleSearch={this.handleSearch}
          handleClear={this.handleClear}
        ></TodoForm>
        <TodoList
          list={this.state.list}
          handleRemove={this.handleRemove}
          handleMarkAsDone={this.handleMarkAsDone}
          handleMarkAsPending={this.handleMarkAsPending}
        ></TodoList>
      </div>
    );
  }
}

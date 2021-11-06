import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Grid from "../templates/grid";
import IconButton from "../templates/iconButton";
import {
  changeDescription,
  search,
  add,
  clear,
} from "../main/actions/todoActions";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.keyHandler = this.keyHandler.bind(this);
  }

  componentWillMount() {
    this.props.search();
  }

  keyHandler(e) {
    const { search, description, add, clear } = this.props;
    if (e.key === "Enter") {
      e.ctrlKey ? search(description) : add(description);
    } else if (e.key === "Escape") {
      clear();
    }
  }

  render() {
    const { search, description, add } = this.props;
    return (
      <div role="form" className="todoForm">
        <Grid cols="12 9 10">
          <input
            id="description"
            className="inputField"
            placeholder="Adcione uma tarefa"
            onChange={this.props.changeDescription}
            onKeyUp={this.keyHandler}
            value={description}
          />
        </Grid>
        <Grid cols="12 3 2">
          <IconButton
            style="primary"
            icon="plus"
            onClick={() => add(description)}
          />
          <IconButton
            style="info"
            icon="search"
            onClick={() => search(description)}
          />
          <IconButton style="default" icon="close" onClick={this.props.clear} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ description: state.todo.description });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ changeDescription, search, add, clear }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);

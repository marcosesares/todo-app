import React from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import IconButton from "../templates/iconButton";
import { markAsDone, markAsPending, remove } from "../main/actions/todoActions";

const TodoList = (props) => {
  const renderRows = () => {
    const {
      list = props.list || [],
      markAsDone,
      markAsPending,
      remove,
      description,
    } = props;
    return list.map((todo) => (
      <tr key={todo._id}>
        <td>{todo.description}</td>
        <td>
          <IconButton
            style="success"
            icon="check"
            hide={todo.done}
            onClick={() => markAsDone(todo)}
          ></IconButton>
          <IconButton
            style="warning"
            icon="undo"
            hide={!todo.done}
            onClick={() => markAsPending(todo)}
          ></IconButton>
          <IconButton
            style="danger"
            icon="trash-o"
            onClick={() => remove(todo)}
          ></IconButton>
        </td>
      </tr>
    ));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th className="tableActions">Ações</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({ list: state.todo.list });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ markAsDone, markAsPending, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

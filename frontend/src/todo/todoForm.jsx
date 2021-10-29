import React from "react";
import Grid from "../templates/grid";
import IconButton from "../templates/iconButton";

export default (props) => (
  <div role="form" className="todoForm">
    <Grid cols="12 9 10">
      <input
        type="text"
        id="description"
        className="form-control"
        placeholder="Adcione uma tarefa"
        value={props.description}
        onChange={props.handleChange}
      />
    </Grid>
    <Grid cols="12 3 2">
      <IconButton style="primary" icon="plus" onClick={props.handleAdd} />
    </Grid>
  </div>
);

import axios from "axios";

const URL = "http://localhost:3003/api/todos";

export const changeDescription = (event) => ({
  type: "UPDATE_DESCRIPTION",
  payload: event.target.value,
});

export const clear = () => {
  return [
    {
      type: "CLEAR_TODO",
    },
    search(),
  ];
};

export const search = (description = "") => {
  const search = description ? `&description__regex=/${description}/` : "";
  const request = axios.get(`${URL}?sort=createdAt${search}`);
  return {
    type: "SEARCH_TODO",
    payload: request,
  };
};

export const add = (description) => {
  return (dispatch) => {
    axios
      .post(URL, { description })
      .then((response) => dispatch(clear()))
      .then((response) => dispatch(search()));
  };
};

export const markAsDone = (todo) => {
  return (dispatch, getState) => {
    const description = getState().todo.description;
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then((response) =>
        dispatch({
          type: "MARK_AS_DONE_TODO",
          payload: response.data,
        })
      )
      .then(() => dispatch(search(description)));
  };
};

export const markAsPending = (todo) => {
  return (dispatch, getState) => {
    const description = getState().todo.description;
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then((response) => dispatch(search(description)));
  };
};

export const remove = (todo) => {
  return (dispatch, getState) => {
    const description = getState().todo.description;
    axios
      .delete(`${URL}/${todo._id}`)
      .then((response) => dispatch(search(description)));
  };
};

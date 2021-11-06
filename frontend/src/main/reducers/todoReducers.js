const INITIAL_STATE = {
  description: "",
  list: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.payload };
    case "MARK_AS_DONE_TODO":
    case "SEARCH_TODO":
      return { ...state, list: action.payload.data };
    case "ADD_TODO":
    case "CLEAR_TODO":
      return { ...state, description: "" };
    default:
      return state;
  }
};

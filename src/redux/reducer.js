export function reducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "IS_FETCHING":
      return { ...state, status: "fetching" };
    case "SET_USER":
      return { ...state, user: action.user, status: "success" };
    case "SET_ERROR":
      return { ...state, status: "error", error: action.error };
    default:
      return state;
  }
}

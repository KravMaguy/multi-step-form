import { fetchUserById } from "../api";

export function getUserById(id) {
  return async function (dispatch, getState) {
    try {
      console.log(getState());
      dispatch({ type: "IS_FETCHING" });
      console.log(getState());

      const user = await fetchUserById(id);
      dispatch({ type: "SET_USER", user });
      console.log(getState());
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error.message });
    }
  };
}

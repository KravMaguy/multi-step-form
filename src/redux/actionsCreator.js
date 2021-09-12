import { fetchUserById, getLocationDetails } from "../api";

export function getUserById(id) {
  return async function (dispatch, getState) {
    try {
      dispatch({ type: "IS_FETCHING" });
      const user = await fetchUserById(id);
      dispatch({ type: "SET_USER", user });
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error.message });
    }
  };
}

export function getPolicyLocation(latitude, longitude) {
  return async function (dispatch, getState) {
    try {
      dispatch({ type: "REQUESTING_LOCATION" });
      const county = await getLocationDetails(latitude, longitude);
      dispatch({ type: "SET_POLICY_LOCATION", county });
    } catch (error) {
      dispatch({ type: "SET_LOCATION_ERROR", error: error.message });
    }
  };
}

export function policyReducer(state = {}, action) {
  switch (action.type) {
    case "REQUESTING_LOCATION":
      return { ...state, status: "requesting location" };
    case "SET_POLICY_LOCATION":
      return {
        ...state,
        county: action.county,
        status: "retrieved policy location",
      };
    case "SET_ERROR":
      return { ...state, status: "error", error: action.error };
    default:
      return state;
  }
}

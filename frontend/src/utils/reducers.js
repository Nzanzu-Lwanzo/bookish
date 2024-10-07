export function modalReducer(state, action) {
  switch (action.type) {
    case "SHOW":
      return {
        show: true,
        element: action.element,
        is_update: action.is_update ?? false,
      };
    case "HIDE":
      return { ...state, show: false, is_update: false };
  }
}

export function fetchFromIDBOnLoad(state, action) {
  switch (action) {
    case "HAS_FETCHED_COLLECTIONS":
      return { ...state, collections_are_fetched: true };
    case "HAS_FETCHED_BOOKS":
      return { ...state, books_are_fetched: true };
    case "BACK_TO_NORMAL_ANYWAY":
      return { collections_are_fetched: true, books_are_fetched: true };
    default:
      return state;
  }
}

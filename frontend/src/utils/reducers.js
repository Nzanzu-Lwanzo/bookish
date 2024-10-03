export function modalReducer(state, action) {
  switch (action.type) {
    case "SHOW":
      return {
        show: true,
        element: action.element,
        is_update: action.is_update ?? false
      };
    case "HIDE":
      return { ...state, show: false, is_update: false };
  }
}

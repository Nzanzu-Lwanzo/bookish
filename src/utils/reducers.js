export function modalReducer(state, action) {
  switch (action.type) {
    case "SHOW":
      return { show: true, element: action.element };
    case "HIDE":
      return { ...state, show: false };
  }
}

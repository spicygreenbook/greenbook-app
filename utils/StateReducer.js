export const StateReducer = (state, action) => {
  console.log('state', state, 'action', action)
  switch (action.type) {
    case 'setView':
      console.log('set view called', action)
      return {
        ...state,
        view: action.view
      };
    case 'fontsReady':
      return {
        ...state,
        fontsReady: action.value
      };
    case 'setDimensions':
      return {
        ...state,
        dimensions: action.value
      };
    case 'setTheme':
      return {
        ...state,
        theme: action.value
      };
    case 'menuOpen':
      return {
        ...state,
        menuOpen: action.value
      };
      
    default:
      return state;
  }
}

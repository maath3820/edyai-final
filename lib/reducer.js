    // Dans un fichier reducer.js
  const initialState = {
    studentName: '',
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STUDENT_NAME':
        return { ...state, studentName: action.payload };
      // Autres cas
      default:
        return state;
    }
  };
  
  export default rootReducer;
  
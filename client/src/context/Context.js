import { createContext, useEffect, useReducer } from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
   user: JSON.parse(localStorage.getItem('user')) || null,
   // user: null,
   isFetching: false,
   error: false,
};

/* 


50.30
1.28.29


*/

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

   useEffect(() => {
      localStorage.setItem('user', JSON.stringify(state.user));
   }, [state.user]);

   return (
      <Context.Provider
         value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
         }}
      >
         {children}
      </Context.Provider>
   );
};

import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';

export const CTX = createContext();

const initState = {
  general: [
    { from: 'aaron', msg: 'Hello motherfuckers!' },
    { from: 'steve', msg: 'Hello fuckers!' },
    { from: 'arnold', msg: 'Hello mothers!' }
  ],

  topic2: [
    { from: 'steve', msg: 'Hello svin!' },
    { from: 'arnold', msg: 'Hello meruckers!' },
    { from: 'aaron', msg: 'Heo mothrfkers!' }
  ]
};
console.log(initState);
function reducer(state, action) {
  const [from, msg, topic] = action.payload;
  switch (action.type) {
    case 'RECIEVE_MESSAGE':
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
    default:
      return state;
  }
}

let socket;

export default function Store(props) {
  if (!socket) {
    socket = io(':3001');
  }
  const reducerHook = useReducer(reducer, initState);
  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
}

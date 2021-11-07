import { createStore } from 'redux'
// initial state

const initialState = {
  loading: false,
  account: "",
  chainId: null,
  chainHex: null,
  errorMsg: "",
};


// actions
const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccount = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

const updateChainId = (payload) => {
  return {
    type: "UPDATE_CHAINID",
    payload: payload,
  };
};

const updateChainHex = (payload) => {
  return {
    type: "UPDATE_CHAINHEX",
    payload: payload,
  };
};
// reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload,
      };
    case "UPDATE_CHAINID":
      return {
        ...state,
        chainId: action.payload,
      };
    case "UPDATE_CHAINHEX":
      return {
        ...state,
        chainHex: action.payload,
      };
    default:
      return state;
  }
};

// store

export const store = createStore(reducer, initialState)


export { connectRequest, connectSuccess, connectFailed, updateAccount, updateChainId, updateChainHex };

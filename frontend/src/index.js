import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware} from 'redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  userLoginReducer,
  userInfoReducer,
} from './reducers/userReducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "decrement":
//       return { ...state, num: state.num - 1 };
//     case "increment":
//       return { ...state, num: state.num + 1 };
//     default:
//       return state;
//   }
// };

const reducer = combineReducers({
  userLogin:userLoginReducer,
  userInfo:userInfoReducer, 


  // productList: productListReducer,
  // productDetails: productDetailsReducer,
  // productDelete: productDeleteReducer,
  // productCreate: productCreateReducer,
  // productUpdate: productUpdateReducer,
  // productReviewCreate: productReviewCreateReducer,
  // productTopRated: productTopRatedReducer,

  // cart: cartReducer,
  // userLogin: userLoginReducer,
  // userRegister: userRegisterReducer,
  // userDetails: userDetailsReducer,
  // userUpdateProfile: userUpdateProfileReducer,
  // userList: userListReducer,
  // userDelete: userDeleteReducer,
  // userUpdate: userUpdateReducer,

  // orderCreate: orderCreateReducer,
  // orderDetails: orderDetailsReducer,
  // orderPay: orderPayReducer,
  // orderListMy: orderListMyReducer,
  // orderList: orderListReducer,
  // orderDeliver: orderDeliverReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

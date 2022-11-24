import React from 'react'

import { mergeWith, unset } from 'lodash';

import { Provider } from 'react-redux'


const reduxNamespace = 'bshFlex';
const defaultReduxState = {
  flex: {
    worker:{
      attributes:{
        email: "agent@twilio.com",
        full_name: "Flex Agent"
      }
    }
  } ,
  [reduxNamespace]: {} 
}
let mockedReduxState = {
  ...defaultReduxState
};

export const getMockedReduxState = () => mockedReduxState;
export const resetReduxState = () => {
  mockedReduxState = {
   ...defaultReduxState
  };
}
export const setFlexReduxState = (appState) => {
  mergeWith(mockedReduxState, { flex: appState }, (objValue, srcValue, key, obj) => {
    if (srcValue === undefined) {
      unset(obj, key);
    }
  });
}
export const setCustomReduxState = (appState) => {
  mergeWith(mockedReduxState, { [reduxNamespace]: appState }, (objValue, srcValue, key, obj) => {
    if (srcValue === undefined) {
      unset(obj, key);
    }
  });
}






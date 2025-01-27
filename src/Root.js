import React from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default (props) => {
    const middleware = [thunk]
    return (
        <Provider store={createStore(rootReducer,{},applyMiddleware(...middleware))}>
            {props.children}
        </Provider>
    )
}
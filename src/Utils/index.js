import {applyMiddleware,createStore} from 'redux';
import rootReducer from '../reducers';
import {middleware} from '../store';

export const testStore = (initalState={}) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    return createStoreWithMiddleware(rootReducer,initalState);
}

export const findByTestAttr = (component,attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}

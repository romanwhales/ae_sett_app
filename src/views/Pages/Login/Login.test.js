import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr,testStore} from '../../../Utils';
import Login from './Login';


const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<Login store={store} />).dive();
  // console.log(wrapper.debug());
  return wrapper;
}

describe('Login Component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = setUp({})
  })
  it('should render without errors',()=>{
    const component = findByTestAttr(wrapper,'loginComponent');
    expect(component.length).toBe(1)
  })
})


import React from 'react';
import ReactDOM from 'react-dom';
import Skill from './Skill';
import { Bar } from './styles'
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  const skill = ReactDOM.render(<Skill type="Test" rating="4"/>, div);
 
  ReactDOM.unmountComponentAtNode(div);
});



it('colors properly', () => {
    const wrapper = shallow(<Bar />)
    console.log(wrapper.find('Bar'))
  });
  

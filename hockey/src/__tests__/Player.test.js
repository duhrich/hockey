import React from 'react';
import ReactDOM from 'react-dom';
import Player from '../Player';

import { Bar } from '../styles'
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  const player = ReactDOM.render(<Player index={0} name='Test Player' skills={[]}/>, div);
 
  ReactDOM.unmountComponentAtNode(div);
})

it('to have skill component', () => {
  const wrapper = shallow(<Player index={0} name='Test Player' skills={[]}/>);
  console.log(wrapper.find('.Player').children().get(1).props)
  expect(wrapper.find('.Player').children().get(1).props).toHaveProperty('className','Skills')
  
})
  

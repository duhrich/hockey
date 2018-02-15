import React from 'react';
import ReactDOM from 'react-dom';
import Roster from '../Roster';
import { Bar } from '../styles'
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


it('renders without crashing', () => {
    const div = document.createElement('div');
    const roster = ReactDOM.render(<Roster />, div);


    ReactDOM.unmountComponentAtNode(div);
});

it('initializes', () => {

    const div = document.createElement('div');
    const roster = ReactDOM.render(<Roster />, div);
    expect(roster).toHaveProperty('tb')

    expect(roster.state).toHaveProperty('numberOfSquads',0)

})

it('renders properly', () => {
    const wrapper = shallow(<Roster />);

    expect(wrapper.find('.Welcome').get(0)).toHaveProperty('type','div')
    expect(wrapper.find('.Column').get(0).props.style).toHaveProperty('display','none')

});


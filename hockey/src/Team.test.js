import React from 'react';
import ReactDOM from 'react-dom';
import Team from './Team';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


it('renders without crashing', () => {
    const div = document.createElement('div');
    const team = ReactDOM.render(<Team index={1} players={[]} skillSet={[]}  />, div);


    ReactDOM.unmountComponentAtNode(div);
});

it('initializes', () => {

    const div = document.createElement('div');
    const team = ReactDOM.render(<Team index={1} players={[]} skillSet={[]} />, div);

    expect(team.state).toHaveProperty('playersShown',false)


})

it('toggles visibility of players properly', () => {
    const wrapper = shallow(<Team index={1} players={[]} skillSet={[]}/>);

    expect(wrapper.find('.PlayersContainer').get(0).props.style).toHaveProperty('display','none')
    wrapper.find('.Button').simulate('click')
    expect(wrapper.find('.PlayersContainer').get(0).props.style).toHaveProperty('display','')

});


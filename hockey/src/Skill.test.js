import React from 'react';
import ReactDOM from 'react-dom';
import Skill from './Skill';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Skill />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('initializes correctly', () =>{
    const skill = new Skill()
    // expect(skill).toHaveProperty('type','unnamed')
    // expect(skill).toHaveProperty('rating',0)
})


import React, { Component } from 'react';
import { Bar } from './styles'

class Skill extends Component {
    render() {
        let { type, rating } = this.props
        if (!rating) {
            rating = 0
        }
        return (
            <div className="Skill">
                <Bar value={rating/10} type={type}/>
            </div>
        )
    }
}


export default Skill
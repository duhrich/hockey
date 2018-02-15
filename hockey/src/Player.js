import React, { Component } from 'react'
import Skill from './Skill'

class Player extends Component {
    constructor(props) {
        super(props)
        this.eachSkill = this.eachSkill.bind(this)
    }

    eachSkill(skill, i) {
        const computedKey = this.props.index + " " + skill.type
        return (
            <Skill key={computedKey}
                type={skill.type}
                rating={skill.rating}
            />
        )
    }

    render() {
        return (
            <div className="Player">
                {this.props.name}
                <div className="Skills">
                    {this.props.skills.map(this.eachSkill)}
                </div>
            </div>
        )
    }

}

export default Player
import React, { Component } from 'react'
import Skill from './Skill'

class Player extends Component {
    constructor(props) {
        super(props)
        this.eachSkill = this.eachSkill.bind(this)
        this.averageSkill = this.averageSkill.bind(this)
    }

    eachSkill(skill, i) {
        const computedKey = this.props.index + " " + skill.type
        // console.log("computed key",computedKey)
        return (
            <Skill key={computedKey}
                type={skill.type}
                rating={skill.rating}
            />
        )
    }

    averageSkill() {
        return (
            <Skill key="avg"
                type="Average"
                rating={this.props.skills.reduce((a, s) => a + s.rating, 0) / this.props.skills.length}
            />
        )
    }

    render() {
        return (
            <div className="Player">
                {this.props.name}
                <div className="Skills">
                    {this.props.skills.map(this.eachSkill)}
                    {/* {this.averageSkill()} */}
                </div>
            </div>
        )
    }

}

export default Player
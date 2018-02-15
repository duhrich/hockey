import React, { Component } from 'react';

class Skill extends Component {
    // constructor(props) {
    //     super(props)
    //     // console.log("building skill with",props)
    // }

    render() {
        const { type, rating } = this.props
        return (
            <div className="Skill">
                {/* <div className="SkillType">{type}</div> */}
                <div className="SkillRating">{Math.round(rating)}</div>
            </div>
        )
    }

}


export default Skill
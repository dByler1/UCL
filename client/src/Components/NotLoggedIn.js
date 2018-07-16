import React, { Component } from 'react';

class NotLoggedIn extends Component {
    render() {
        return (
            <div className="loginNav">
                <a>contractor login</a>
                <a>contractor register</a>
            </div>
        )
    }
}

export default (NotLoggedIn);
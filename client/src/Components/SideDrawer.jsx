import React from 'react';
import Login from './Login';

class SideDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="sidebar" id="auth-drawer">
                <span onClick = {this.props.closeDrawer} > &times; </span>
                <Login />
            </div>
        );
    }
}

export default SideDrawer;

import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    signIn = () => {
        this.props.openDrawer();
    }

    signUp = () => {
        this.props.openDrawer();
    }

    render() {
        return (
            <header>
                <h1 className="text-title">Classroom <span >Scheduler</span></h1>
                <div className="auth">
                    <button onClick={this.signIn} className="btn btn-light" type="submit">sign in</button>
                    <button onClick={this.signUp} className="btn btn-primary" type="submit">sign up</button>
                </div>
            </header>
        );
    }
}

export default Header;

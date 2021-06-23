import React from 'react';
import Login from './Login'
import SignUp from './SignUp';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {path,navigate} = this.props;
        return (
            <main>
              { path === "signin" && <Login path={path} navigate={navigate}/>   }
              { path === "signup" && <SignUp path={path} navigate={navigate} /> }
            </main>
        );
    }

}

export default Main;

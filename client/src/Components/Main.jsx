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
               {path === "" && <h1 className="text-center vertical-center center-title">classroom Scheduler</h1> }
               { path === "signin" && <Login path={path} navigate={navigate}/>   }
              {path === "signup" && <SignUp path={path} navigate={navigate} /> }
              {path === "calender" && <h1 className="text-center vertical-center center-title">PepCoding Calender </h1> }
            </main>
        );
    }

}

export default Main;

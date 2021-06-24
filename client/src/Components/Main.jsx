import React from 'react';
import Calendar from './Calendar';
import Login from './Login'
import SignUp from './SignUp';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {path,navigate,viewMode} = this.props;
        return (
            <main>
               {path === "" && <h1 className="text-center vertical-center center-title">classroom Scheduler</h1> }
               { path === "signin" && <Login path={path} navigate={navigate}/>   }
              {path === "signup" && <SignUp path={path} navigate={navigate} /> }
              {path === "calendar" && <Calendar  viewMode={viewMode} /> }
            </main>
        );
    }

}

export default Main;

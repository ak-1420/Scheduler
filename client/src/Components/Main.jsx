import React from 'react';
import Batches from './Batches';
import Calendar from './Calendar';
import Login from './Login'
import SignUp from './SignUp';
import Teachers from './Teachers';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {path,navigate,viewMode} = this.props;

        if(window.location.pathname === '/batches') return (<main>
            <Batches />
            </main>
            );

        if(window.location.pathname === '/teachers') return (
            <main>
                <Teachers />
            </main>
        );
        
        return (
            <main>
                        
                        {path === "" && <h1 className="text-center vertical-center center-title">classroom Scheduler</h1> }
                        {path === "signin" && <Login path={path} navigate={navigate}/>   }
                        {path === "signup" && <SignUp path={path} navigate={navigate} /> }
                        {path === "calendar" && <Calendar  viewMode={viewMode} /> }
            </main>
        );
    }

}

export default Main;

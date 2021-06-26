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
            <Batches setToast={this.props.setToast}/>
            </main>
            );

        if(window.location.pathname === '/teachers') return (
            <main>
                <Teachers setToast={this.props.setToast}/>
            </main>
        );

        if(window.location.pathname === '/') return (
            <main>
                <h1 className="text-center vertical-center center-title">classroom Scheduler</h1> 
            </main>
        );
        if(window.location.pathname === '/signin') return (
            <main>
                <Login setToast={this.props.setToast} path={path} navigate={navigate}/>
            </main>
        );
        if(window.location.pathname === '/signup') return (
            <main>
                <SignUp setToast={this.props.setToast} path={path} navigate={navigate} />
            </main>
        );
        if(window.location.pathname === '/calendar') return (
            <main>
                <Calendar setToast={this.props.setToast}  viewMode={viewMode} /> 
            </main>
        );

        return (
            <main>
                <center>
                    <h4 className="center" >Oops Page Not Found </h4>
                </center>
            </main>
        );
        
    }

}

export default Main;

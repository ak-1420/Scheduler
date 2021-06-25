import React from 'react';
import DateByView from './DateByView';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    home = () => {
       this.props.navigate('')
       window.location.pathname = '/'
    }

    navSignIn = () => {
        // this.props.navigate('signin')
        window.location.pathname = '/signin'
    }

    navSignUp = () => {
        // this.props.navigate('signup')
        window.location.pathname = '/signup'
    }

    signOut = () => {
        window.localStorage.setItem('user',null);
        window.alert('logout completed successfully!')
        window.location.pathname = ""
    }
    
    navCalendar = () => {
        window.location.pathname = '/calendar'
    }

    render() {

        const user = (localStorage.getItem('user') !== null) ? JSON.parse(localStorage.getItem('user')) : null ;

        return (
            <header>
                { <h1 className="text-title" onClick={this.home}>Classroom <small>Scheduler</small></h1> }

               {(user && user.type == 'admin') && <ul className="list-group">
                    <a className="list-group-item" href="/batches"> Batches </a>
                    <a className="list-group-item" href="/teachers">Teachers</a>
                 </ul>
                }

                {( user && window.location.pathname === '/calendar') && <DateByView changeViewMode = {this.props.changeViewMode} /> }
                 
                

                <div className="auth">

                    { !user && (window.location.pathname !== '/calendar') && 
                        <React.Fragment>
                        <button onClick={this.navSignIn} className="btn btn-light" type="submit">sign in</button>
                        <button onClick={this.navSignUp} className="btn btn-primary" type="submit">sign up</button>
                        </React.Fragment>
                    }

                    {
                         user 
                        && <React.Fragment>
                       {window.location.pathname !== '/calendar' && <button onClick={this.navCalendar} className="btn btn-light" type="submit">calendar</button>}
                        <button onClick={this.signOut} className="btn btn-light" type="submit">sign out</button>
                        </React.Fragment>
                    }

                </div>
            </header>
        );
    }
}

export default Header;

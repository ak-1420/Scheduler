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
        this.props.navigate('signin')
    }

    navSignUp = () => {
        this.props.navigate('signup')
    }

    render() {

        return (
            <header>
                { <h1 className="text-title" onClick={this.home}>Classroom <small>Scheduler</small></h1> }

                <ul className="list-group">
                    <a className="list-group-item" href="/batches"> Batches </a>
                    <a className="list-group-item" href="/teachers">Teachers</a>
                </ul>

                {(this.props.path === 'calendar') && <DateByView changeViewMode = {this.props.changeViewMode} /> }
                 
                

                    <div className="auth">
                      { (this.props.path !== 'calendar') && 
                         <React.Fragment>
                           <button onClick={this.navSignIn} className="btn btn-light" type="submit">sign in</button>
                           <button onClick={this.navSignUp} className="btn btn-primary" type="submit">sign up</button>
                         </React.Fragment>
                      }
                   </div>
            </header>
        );
    }
}

export default Header;

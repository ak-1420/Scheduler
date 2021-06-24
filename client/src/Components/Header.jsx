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
                { <h1 className="text-title" onClick={this.home}>Classroom <span >Scheduler</span></h1> }
                {(this.props.path === 'calender') && <DateByView /> }
                    <div className="auth">
                      { (this.props.path !== 'calender') && 
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

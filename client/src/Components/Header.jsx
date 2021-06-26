import React from 'react';
import DateByView from './DateByView';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    home = (e) => {
        e.preventDefault()
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

    signOut = (e) => {
        e.preventDefault()
        window.localStorage.setItem('user',null);
        this.props.setToast({type:'success',data:'signed out successfully!'})
        window.location.pathname = ""
    }
    
    navCalendar = (e) => {
        e.preventDefault()
        window.location.pathname = '/calendar'
    }
    
    openSideBar = (e) => {
        e.preventDefault()
        var x = document.getElementById("header");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      
    }
     
    render() {

        const user = (localStorage.getItem('user') !== null) ? JSON.parse(localStorage.getItem('user')) : null ;

        return (
            <header className="topnav" id="header">


                <a href="/" onClick={this.home} className="active btn btn-light">Classroom Scheduler</a>
                   {
                         (user) 
                        && <React.Fragment>
                       {window.location.pathname !== '/calendar' && <a onClick={this.navCalendar} href ="/calendar" className="btn btn-light " >calendar</a>}
                        </React.Fragment>
                    }

               
                

               


                {(user && user.type == 'admin') && 
                //  <ul className="list-group">
                    <React.Fragment>
                    <a className="btn btn-light" href="/batches"> Batches </a>
                    <a className="btn btn-light" href="/teachers">Teachers</a>
                    </React.Fragment>
                //  </ul>
                }

              {( user && window.location.pathname === '/calendar') && <DateByView changeViewMode = {this.props.changeViewMode} /> } 


              { !user && (window.location.pathname !== '/calendar') && 
                        <React.Fragment>
                        <a href="/signin" onClick={this.navSignIn} className="btn btn-light" type="submit">sign in</a>
                        <a href="/signup" onClick={this.navSignUp} className="btn btn-light" type="submit">sign up</a>
                        </React.Fragment>
               }

               {(user) &&  <a onClick={this.signOut} href="/" className="btn btn-light" >sign out</a>}



                
                <a className="icon btn btn-light" onClick={this.openSideBar}>
                    <i className="fa fa-bars"></i>
                </a>




                {/* { <h1 className="text-title" onClick={this.home}>Classroom <small>Scheduler</small></h1> } */}

               {/* {(user && user.type == 'admin') && <ul className="list-group">
                    <a className="list-group-item" href="/batches"> Batches </a>
                    <a className="list-group-item" href="/teachers">Teachers</a>
                 </ul>
                } */}

                {/* {( user && window.location.pathname === '/calendar') && <DateByView changeViewMode = {this.props.changeViewMode} /> } */}
                 
                

                {/* <div className="auth">

                    { !user && (window.location.pathname !== '/calendar') && 
                        <React.Fragment>
                        <button onClick={this.navSignIn} className="btn btn-light" type="submit">sign in</button>
                        <button onClick={this.navSignUp} className="btn btn-primary" type="submit">sign up</button>
                        </React.Fragment>
                    }

                    // {{
                    //      user 
                    //     && <React.Fragment>
                    //    {window.location.pathname !== '/calendar' && <button onClick={this.navCalendar} className="btn btn-light" type="submit">calendar</button>}
                    //     <button onClick={this.signOut} className="btn btn-light" type="submit">sign out</button>
                    //     </React.Fragment>
                    // } }

                </div> */
               }
            </header>
        );
    }
}

export default Header;

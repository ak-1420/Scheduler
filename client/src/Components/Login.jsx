import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    navSignUp = () => {
        this.props.navigate('signup')
    }


    render() {
        return (
               <div className="container">
                    <form className="login">
                        <h2 className="text-dark uppercase"> sign in </h2>
                        <label className="form-label" htmlFor="txtEmail">Email Id</label>
                        <input className="form-input" type="text" name="email" id="txtEmail" />
                        <label className="form-label" htmlFor="txtPassword">Password</label>
                        <input className="form-input" type="password" name="password" id="txtPassword" />
                        <button type="submit" className="btn-primary btn">submit</button>
                        <p className="text-para"> Don't have an account ? <span className="link" onClick={this.navSignUp}>sign up</span></p>
                    </form>
               </div>
        );
    }
}

export default Login;




import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
               
                 <form className="login">
                 <h2 className="text-light"> Login </h2>
                    <input className="form-input" type="text" name="email" id="txtEmail"/>
                    <input className="form-input" type="password" name="password" id="txtPassword"/>
                    <button type="submit" className="btn-primary btn-drawer">Login</button>
                    <p> Don't have an account ? <a href="/signup">sign up</a></p>
                </form>
            </React.Fragment>
        );
    }
}

export default Login;

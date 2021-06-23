import React from 'react';


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    navSignIn = () => {
        this.props.navigate('signin')
    }

    render() {

        return (
            <div className="container">
            <form className="login">
                <h2 className="text-dark uppercase"> Sign Up </h2>
                <label className="form-label" htmlFor="txtEmail">Email Id</label>
                <input className="form-input" type="text" name="email" id="txtEmail" />
                <label className="form-label" htmlFor="txtPassword">Password</label>
                <input className="form-input" type="password" name="password" id="txtPassword" />
                <button type="submit" className="btn-primary btn">submit</button>
                <p className="text-para"> have an account ? <span className="link" onClick={this.navSignIn}>sign in</span></p>
            </form>
         </div>
        );
    }
}


export default SignUp;

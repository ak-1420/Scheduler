import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        };
    }

    navSignUp = () => {
        //this.props.navigate('signup')
        window.location.pathname = '/signup'
    }

    login  = (e) => {
        e.preventDefault();

        const {email,password} = this.state;



        if(email === '')
        {
            this.props.setToast({type:'danger',data:'please enter an email!'});
            return;
        }
        
        if(password === '')
        {
            this.props.setToast({type:'danger',data:'please enter a password!'});
            
            return;
        }

        // perform login operation

        const url = `https://api-classroom-scheduler.herokuapp.com/api/v1/users/signin`

        fetch(url,{
          method: "post",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
             email:email,
             password:password,
          })
        }).then( (response) =>
         response.json())
         .then( (data) =>{
          console.log('data after login:',data)

          if(data.status === 'login-success')
          {
             const user = data.data[0]
             window.localStorage.setItem('user',JSON.stringify(user));
             this.props.setToast({type:'success',data:`Welcome back ${user.email}`})
             window.location.pathname = '/calendar'
          }
          else if(data.status === 'no-user-exists')
          {
              this.props.setToast({type:'danger',data:'invalid email/password combination!'})
              return;
          }

         }).catch((error) => {
            this.props.setToast({type:'danger',data:'unable to login please try again!'})
            console.log('error:',error)
            return;
           
       });
    
    }


    handleChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
    } 


    render() {

        const user = (localStorage.getItem('user') !== null) ? JSON.parse(localStorage.getItem('user')) : null ;


        if(user) {
            return (<> </>);
        }

        
        
        return (
               <div className="container">
                    <form className="login">
                        <h2 className="text-dark uppercase"> sign in </h2>
                        <label className="form-label" htmlFor="txtEmail">Email Id</label>
                        <input onChange={this.handleChange} className="form-input" type="text" name="email" id="txtEmail" />
                        <label className="form-label" htmlFor="txtPassword">Password</label>
                        <input onChange={this.handleChange} className="form-input" type="password" name="password" id="txtPassword" />
                        <button onClick={this.login} type="submit" className="btn-primary btn">submit</button>
                        <p className="text-para"> Don't have an account ? <span className="link" onClick={this.navSignUp}>sign up</span></p>
                    </form>
               </div>
        );
    }
}

export default Login;




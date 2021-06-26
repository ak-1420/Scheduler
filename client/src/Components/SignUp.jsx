import React from 'react';


class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    navSignIn = () => {
        // this.props.navigate('signin')
        window.location.pathname = '/signin'
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
    } 

    
    signUp  = (e) => {

        e.preventDefault();

        const {email,password} = this.state;



        if(email === '')
        {
            this.props.setToast({type:'danger',data:'please enter an email!'});
            return;
        }
        
        if(password === '')
        {
            this.props.setToast({type:'danger',data:'please enter a password!'})
            return;
        }

        // perform login operation

        const url = `https://api-classroom-scheduler.herokuapp.com/api/v1/users/signup`

        fetch(url,{
          method: "post",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
             email:email,
             password:password,
             type:'student'
          })
        }).then( (response) =>
         response.json())
         .then( (data) =>{
          
         const userId = data.data;

         if(data.message !== undefined)
         {
             this.props.setToast({type:'success',data:'registration successful!,please login!'})
             window.location.pathname = '/signin'
         }
         else 
         {
             this.props.setToast({type:'danger',data:'email ID exists !'});
             return;
         }
          
         }).catch((error) => {
            this.props.setToast({type:'danger',data:'unable to signup please try again!'})
            console.log('error:',error)
            return;
           
       });
    
    }


    render() {

        const user = (localStorage.getItem('user') !== null) ? JSON.parse(localStorage.getItem('user')) : null ;


        if(user) {
            return (<> </>);
        }

        return (
            <div className="container">
            <form className="login">
                <h2 className="text-dark uppercase"> Sign Up </h2>
                <label className="form-label" htmlFor="txtEmail">Email Id</label>
                <input onChange={this.handleChange} className="form-input" type="text" name="email" id="txtEmail" />
                <label className="form-label" htmlFor="txtPassword">Password</label>
                <input onChange={this.handleChange} className="form-input" type="password" name="password" id="txtPassword" />
                <button onClick={this.signUp} type="submit" className="btn-primary btn">submit</button>
                <p className="text-para"> have an account ? <span className="link" onClick={this.navSignIn}>sign in</span></p>
            </form>
         </div>
        );
    }
}


export default SignUp;

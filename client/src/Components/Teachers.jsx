import React from 'react';
import BatchBox from './BatchBox';


class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            teachers:[]
        };
    }

    componentDidMount(){
        this.fetchTeachers();
    }


    fetchTeachers = () => {
        const url = `https://api-classroom-scheduler.herokuapp.com/api/v1/users`

        fetch(url).then( (response) => response.json())
        .then( (data) => {
            console.log('teachers fetched:',data);
            this.setState({
                teachers:data.data
            },()=>{
                console.log('teachers:',this.state.teachers);
            })
        })
    }

    showForm = () => {
        document.getElementById('form-add-teacher').style.display = 'block';
     
    }

    hideForm = () => {
        document.getElementById('form-add-teacher').style.display = 'none';
       
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    
    addTeacher = (e) => {
        e.preventDefault()

        const {email,password} = this.state;

        if(email === "")
        {
            window.alert('please enter an email!')
            return;
        }
       
        if(password === "")
        {
            window.alert('please enter a password')
            return;
        }

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
             type:'teacher'
          })
        }).then( (response) => { 
          if(response.status === 200)
          {
              window.alert('teacher added sucessfully!');
              console.log(response);
              this.fetchTeachers();
          }
       }).catch((error) => {
           console.log('error:',error)
       });
    
    }


    render() {
        const user = (localStorage.getItem('user') !== null) ? JSON.parse(localStorage.getItem('user')) : null ;


        if(!user) {
            return (<> </>);
        }

        const {teachers} = this.state;
        return (
            <div className="teachers">

                <div className="batch-header">
                         <h4 className="text-batch-heading "> Available teachers </h4>
                         <button type="button" className="btn btn-primary" onClick={this.showForm}>Add teacher</button>
                </div>

                <div className="container" id="form-add-teacher" style={{display:'none',marginTop:'20px'}}>
                    <form className="login">
                        <h2 className="text-dark uppercase"> Add New Teacher </h2>
                        <label className="form-label" htmlFor="txtEmail">Email Id</label>
                        <input onChange={this.handleChange} className="form-input" type="text" name="email" id="txtEmail" />
                        <label  className="form-label" htmlFor="txtPassword">Give a password</label>
                        <input onChange={this.handleChange} className="form-input" type="password" name="password" id="txtPassword" />
                        <button onClick={this.addTeacher} type="submit" className="btn-primary btn">submit</button>
                        <button type="button" className="btn-secondary btn" onClick={this.hideForm}>cancel</button>
                    </form>
               </div>



                <div className="grid-batches">
                      {(teachers ) && 
                         
                         teachers.map((teacher,id) => {
                             if(teacher.type === 'teacher')
                           return <BatchBox key={id}  batchId = {teacher.id} name ={teacher.email} id={id}/>
                         })
                      }
                 </div>
            </div>
        );
    }
}

export default Teachers;

import React from 'react';
import BatchBox from './BatchBox';

class Batches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            batches:[],
            users:[],
            newBatch:[],
            name:'',
            batchId:'',
        };
    }

    componentDidMount(){
        this.fetchData();
    }


    fetchData = () => {
        this.fetchUsers();
        this.fetchBatches();
    }


    fetchUsers = () => {
        const url = `https://api-classroom-scheduler.herokuapp.com/api/v1/users`

        fetch(url).then( (response) => response.json())
        .then( (data) => {
            console.log('users fetched:',data);
            this.setState({
                users:data.data
            },()=>{
                console.log('users:',this.state.users);
            })
        })

    }

    fetchBatches  = () => {
        const url = `https://api-classroom-scheduler.herokuapp.com/api/v1/batches/`
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            console.log('data from batches:',data);
            this.setState({
                batches:data.data
            },() => {
                console.log('batches in ui ',this.state.batches)
            })
        }).catch((error)=>{
            console.log('error:',error)
        })
    }

    showForm = () => {
        document.getElementById('form-add-batch').style.display = 'block';
        document.getElementById('form-students').style.display = 'block';
    }

    hideForm = () => {
        document.getElementById('form-add-batch').style.display = 'none';
        document.getElementById('form-students').style.display = 'none';
    }

    handleChange = (e) => {

          this.setState({
            [e.target.name]:e.target.value
         })
    }

    addBatch = (e) =>  {
        e.preventDefault()
        const {users ,name,batchId,batches} =  this.state;

        if(name === ''){
          this.props.setToast({type:'danger',data:'please enter the batch name'});
            return;
        }
        
        if(batchId === null || batchId === "") {
            this.props.setToast({type:'danger',data:'please enter batchId'})
            return;
        }

        //convert batchId to number

        let batch_id = parseInt(batchId);

        //check if batchId exists already

        let isBatchIdExists = false

      const x =  batches.map((batch,indx) => {
            if(batch.batchId === batch_id)
            {
                   isBatchIdExists = true
                   return true
            }
        })

        console.log(x);



        if(isBatchIdExists)
        {
            this.props.setToast({type:'danger',data:'batchId already exists!'});
            return;
        }

        let batch = []
        let isAtleaseOneStudentSelected =  false
        
        users.map((user,indx) => {
            if(user.type === 'student')
            if(document.getElementById(`checkbox${user.id}`).checked){
                isAtleaseOneStudentSelected = true;
                console.log(user);

                batch.push([batch_id,name, user.id])
            }
        })

        if(!isAtleaseOneStudentSelected){
            this.props.setToast({type:'danger',data:'please add atleast one student to the batch!'})
            return;
        }

      // add this batch

      console.log(JSON.stringify({'batchList':batch}))

      console.log('add this batch now:',batch)
     
      const url = `https://api-classroom-scheduler.herokuapp.com/api/v1/batches/`

      fetch(url,{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            batchList: batch,
        })
      }).then( (response) => { 
        if(response.status === 200)
        {
            this.props.setToast({type:'success',data:'batch added sucessfully!'});
            console.log(response);
            this.fetchBatches();
        }
     }).catch((error) => {
        this.props.setToast({type:'danger',data:'unable to add batch try again!'});
         console.log('error:',error)
     });
  
    }
   

    render() {

        const user = (localStorage.getItem('user') !== null) ? JSON.parse(localStorage.getItem('user')) : null ;
        

        if(!user) {
            return (<> </>);
        }

        const {batches ,users} = this.state;

       const disBatch = []

       let done  = []

       batches.map((batch,indx) =>{
           if(!done.includes(batch.batchId) )
           {
                      disBatch.push(
                          {'batchId': batch.batchId,
                          'name':batch.name}
                      )

                      done.push(batch.batchId)
           }
       })

    
        return (
            <div className="batches">
                {/* text available batches */}

                    <div className="batch-header">
                         <h4 className="text-batch-heading "> Available batches </h4>
                         <button type="button" className="btn btn-primary" onClick={this.showForm}>Add batch</button>

                     </div>

                     {/* add batch container */}
                    <div className="container-batch-form-left" id="form-add-batch" style={{display:'none'}}>
                        <form className="login">
                            <h2 className="text-dark uppercase"> Add a new batch </h2>
                            <label className="form-label" htmlFor="txtBatchId">Batch Id</label>
                            <input className="form-input" value={this.state.batchId} type="text" name="batchId" id="txtBatchId" onChange={(e) => {this.setState({batchId : e.target.value.replace(/\D/,'')})}}/>
                            <label className="form-label" htmlFor="txtBatchName">Batch Name</label>
                            <input className="form-input" type="text" name="name" id="txtBatchName"  onChange={this.handleChange}/>
                            <button type="submit" className="btn-primary btn" onClick={this.addBatch}>submit</button>
                            <button type="button" className="btn-secondary btn" onClick={this.hideForm}>cancel</button>
                        </form>
                    </div>
                   
                         {/* add batch container */}

                         {/* display students here */}
                         <div className="container-batch-form-right" id="form-students" style={{display:'none'}}>
                         <form className="login">
                            <h4 className="text-dark uppercase"> Add students to the batch </h4>
                             
                            <div className="scroller">
                            <div className="user-list">

                                {
                                    (users) && 

                                    users.map((user, indx) => {
                                        if(user.type === 'student')
                                        return (
                                        <div id={`user${indx}`} className="user_box" key={indx}  onClick={() => {
                                            document.getElementById(`user${indx}`).style.backgroundColor = (document.getElementById(`checkbox${user.id}`).checked) ? 'green' : 'white';
                                        }}>
                                            <input type="checkbox" style={{display:'none'}} id={`checkbox${user.id}`} value={user.id}/>
                                            <div className="user_grid">
                                            <span className="text-batch-heading">email:{user.email}</span>
                                            <span className="text-batch-heading">id:{user.id}</span>
                                            <label htmlFor={`checkbox${user.id}`}> Add </label>
                                            </div>
                                        </div>
                                        );
                                    })

                                }
                               
                            </div>
                             
                            </div>
                        </form>
                        </div>
                    {/* display students here */}

                 <div className="grid-batches">
                      {(disBatch ) && 
                         
                         disBatch.map((batch,id) => {
                           return <BatchBox key={id}  batchId = {batch.batchId} name ={batch.name} id={id}/>
                         })
                      }
                 </div>
            </div>
        );
    }
}


export default Batches;

import React from 'react';



const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];


class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers:[],
            batches:[],
            schedules:[],
            finalSchedule:{
                date:'',
                timings:'',
                title:'',
                batchId:'',
                teacherId:'',
                scheduleId:''
            }
        };
    }

    componentDidMount(){
        this.fetchBatches()
        this.fetchTeachers()
        this.fetchSchedules()
    }

    closeModal = () => {
        var modal = document.getElementById("modal");
        modal.style.display = 'none';
    }

    fetchSchedules = () => {
        const url = `http://localhost:1420/api/v1/schedules/`
        
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            console.log('data from schedules:',data);
            this.setState({
                ...this.state,
                schedules:data.data
            },() => {
                console.log('schedules in ui ',this.state.schedules)
            })
        }).catch((error)=>{
            console.log('error:',error)
        })

    }

    fetchBatches  = () => {
        const url = `http://localhost:1420/api/v1/batches/`
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            console.log('data from batches:',data);
            this.setState({
                ...this.state,
                batches:data.data
            },() => {
                console.log('batches in ui ',this.state.batches)
            })
        }).catch((error)=>{
            console.log('error:',error)
        })
    }

    fetchTeachers = () => {

        const url = `http://localhost:1420/api/v1/users`

        fetch(url).then( (response) => response.json())
        .then( (data) => {
            console.log('teachers fetched:',data);
            this.setState({
                ...this.state,
                teachers:data.data
            },()=>{
                console.log('teachers:',this.state.teachers);
            })
        })
    }

    handleChange = (e) => {
        const {schedule} = this.props

        this.setState({
            finalSchedule:{
                ...this.state.finalSchedule,
                [e.target.name]:e.target.value,
                date:schedule.date,
                scheduleId:schedule.scheduleId
            }
        },()=>{
            console.log(schedule);
            console.log(this.state.finalSchedule)
        })

    }

    handleSelected = (e) => {
        const {schedule} = this.props;
        this.setState({
            finalSchedule:{
                ...this.state.finalSchedule,
                [e.target.name] : document.getElementById(e.target.id).value,
                date:schedule.date,
                scheduleId:schedule.scheduleId
            }
        },()=>{
            console.log('not:',this.state.finalSchedule)
        })
    }


    setSchedule = () => {
           const {finalSchedule,schedules} = this.state;

           if(finalSchedule.timings === '') {
               window.alert('please select timings');
               return;
           }

           if(finalSchedule.date === '') {
            window.alert('please select date');
            return;
        }

        if(finalSchedule.title === '') {
            window.alert('please enter a title');
            return;
        }

        if(finalSchedule.batchId === '') {
            window.alert('please select a batch');
            return;
        }

        if(finalSchedule.teacherId === '') {
            window.alert('please select a teacher');
            return;
        }

        
        //check wheather teacher have any batch at the given time already
        
         let isOverlappingTime = false

         schedules.map( (schedule,indx) => {
             if(parseInt(finalSchedule.teacherId) === parseInt(schedule.teacherId))
             {
                 // teacher already have some schedules
                 // now check they are overlapping with this schedule

                 if(finalSchedule.timings === schedule.timings )
                 {
                     // they are overlapping
                     isOverlappingTime = true
                 }
             }
         })


         if(isOverlappingTime)
         {
             window.alert(`there is already a schedule at ${finalSchedule.timings}`)
             return;
         }

         // now add schedule
        this.postSchedule(finalSchedule)
    }

    postSchedule = (sdl) => {
        const url = `http://localhost:1420/api/v1/schedules`

        fetch(url,{
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                scheduleId: sdl.scheduleId,
                title:sdl.title,
                timings:sdl.timings,
                date:sdl.date,
                batchId: parseInt(sdl.batchId),
                teacherId: parseInt(sdl.teacherId)
            })
          }).then( (response) => { 
            if(response.status === 200)
            {
                window.alert('schedule added sucessfully!');
                console.log(response);
                this.fetchSchedules();
                this.closeModal();
                window.location.reload()  
            }
            else
            {
              window.alert(`error: server responded with ${response.status}`)
            }
         }).catch((error) => {
             console.log('error:',error)
         });

      
    }


    render() {

        const {batches ,teachers} = this.state;

       const unique_batches = []

       let done  = []

       batches.map((batch,indx) =>{
           if(!done.includes(batch.batchId) )
           {
            unique_batches.push(
                          {'batchId': batch.batchId,
                          'name':batch.name}
                      )

                      done.push(batch.batchId)
           }
       })

       const {schedule} = this.props;
        

      

        return (
            <div>
                <div id="modal" className="modal">

                    <div className="modal-content">

                        <div className="modal-header">
                            <span style={{cursor:'pointer'}} className="close" onClick={this.closeModal}>&times;</span>
                            <h2>ADD SCHEDULE</h2>
                        </div>

                        <div className="modal-body">
                        <input readOnly type="text" style={{marginLeft:'auto',marginRight:'auto',marginTop:'10px',marginBottom:'10px'}} className="form-input" name="date" value={schedule.date} />
                            
                            <input onChange = {this.handleChange} type="text" style={{marginLeft:'auto',marginRight:'auto',marginTop:'10px',marginBottom:'10px'}} className="form-input" name="title" placeholder="enter a title" />
                            

                            <select onChange={this.handleSelected} style={{marginLeft:'auto',marginRight:'auto',marginTop:'10px',marginBottom:'10px'}} className="form-input" name="timings" id="timings-dropdown">
                                <option value="default">Select timings</option>
                                {
                                    hours.map((hour , indx) => {
                                        return <option key={indx} value={`${hour}:00 - ${hour + 1}:00`}>{`${hour}:00 - ${(hour + 1 ===  24) ? 0 : hour + 1}:00`}</option>
                                    })
                                }
                            </select>






                            <select onChange={this.handleSelected} style={{marginLeft:'auto',marginRight:'auto',marginTop:'10px',marginBottom:'10px'}} className="form-input" name="batchId" id="batch-dropdown">
                                <option value="default">Select batch</option>
                                {
                                   (unique_batches) && 
                                   unique_batches.map((batch,indx)=>{
                                       return <option key={indx} value={batch.batchId}>{batch.name}</option>
                                   })
                                }
                            </select>

                            <select onChange={this.handleSelected} style={{marginLeft:'auto',marginRight:'auto',marginTop:'10px',marginBottom:'10px'}} className="form-input" name="teacherId" id="teacher-dropdown">
                                <option  value="default">Select teacher</option>
                                {
                                   (teachers) && 
                                   teachers.map((teacher,indx)=>{
                                       if(teacher.type === 'teacher')
                                       return <option key={indx} value={teacher.id}>{teacher.email}</option>
                                   })
                                }
                            </select>

                            <div className="center">
                            <button style={{marginTop:'10px',marginBottom:'10px',width:'80px'}} onClick={this.setSchedule} type="submit" className="btn-primary btn form-input">Submit</button>
                            <button style={{marginTop:'10px',marginBottom:'10px',width:'80px'}} onClick={this.closeModal} type="submit" className="btn-secondary btn form-input">Cancel</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <h3>Modal Footer</h3> */}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Modal;

import React from 'react';

const week = ['Sun' , 'Mon' , 'Tue' ,'Wed' , 'Thu' , 'Fri' , 'Sat']

class CalendarBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDay:this.props.day - this.props.fpd,
            currentWeekDay : week[((this.props.day - this.props.fpd + 1) % 7)],
            currentYear: this.props.year,
            currentMonth: this.props.month
        };
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            currentYear:this.props.year,
            currentMonth:this.props.month + 1
        })
    }

    addSchedule = () => {
        var modal = document.getElementById("modal");
        modal.style.display = 'block';

        const {year , month , day,fpd,weekday} = this.props;
        
        const date = `${weekday}  ${day - fpd}/${month + 1}/${year}`;

        const db_format_date = `${year}/${month + 1}/${day - fpd}`;


        let newSchedule = {
            date: db_format_date,
            timings:'',
            scheduleId: Math.floor((Math.random() * 10000000) + 1),
            title:'',
            batchId:'',
            teacherId:''
        }
         
        this.props.updateSchedule(newSchedule)

        console.log('add event on:',db_format_date)
       // window.alert(`add event on ${date}`)
    }

    render() {
        
        //nd: number of days in the month
        //fd: first day in the month
        //fpd: front padding days
        //bpd: back padding days

        const user = (localStorage.getItem('user') !== null) ? JSON.parse(localStorage.getItem('user')) : null ;
        


        if(!user) {
            return (<> </>);
        }

        const {id , day , weekday,isWeekBox,nd,fd,fpd,bpd ,year,month , displaySchedules} = this.props;

        const cal_date = `${day - fpd}/${month + 1}/${year}`;

        let todaySchedules = []
        if(displaySchedules)
        {
         
         todaySchedules = displaySchedules.map((schedule,indx)=>{
                
                const year_s =  new Date(schedule.date).getFullYear() ;
                const month_s =  new Date(schedule.date).getMonth() + 1;
                const day_s =  new Date(schedule.date).getDate();

                const sdl_date = `${day_s}/${month_s}/${year_s}`

                if(cal_date == sdl_date)
                 {
                   return schedule
                 }

            })

           
        }

       
     

        if(isWeekBox)
        {
            return (
            <div className='week_box' id={id}>
                <h4 className="text-dark">{weekday}</h4>
            </div>
           );
        }
        else
        {
            if((day > fd && day <= nd + fpd))
            {
                // day in current month
                return (
                    <div className="calendar_box" id = {id}   onClick={(user.type === 'admin') ? this.addSchedule : () =>{}}>
                     <h2 className="text-primary">{day - fpd}</h2>
                     
                     
                         <React.Fragment>
                          {
                            todaySchedules &&
                            todaySchedules.map((schedule,indx) => {
                                if(schedule)
                                 {
                                     return (
                                      <div className="schedule_box">
                                          <span>{schedule.title}</span>
                                      </div>
                                    );
                                }
                             })
                          }
                        </React.Fragment>
                    
                     
                    </div>
                 );
            }
            else
            {
                // day is either prev or next month
                    return(
                        <div className="next_prev_calender_box" id = {id} >
                         {/* <h2 className="text-primary">{day - fpd}</h2> */}
                        </div>
                    );
            }
            
        }
    }
}

export default CalendarBox;

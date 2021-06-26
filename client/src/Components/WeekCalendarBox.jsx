import React from 'react';

const week = ['Sun' , 'Mon' , 'Tue' ,'Wed' , 'Thu' , 'Fri' , 'Sat']

class WeekCalendarBox extends React.Component {

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

        const {year , month , day,fpd,weekday ,id,fd,finaldates} = this.props;
        
        const date = `${weekday}  ${finaldates[id - fd]}/${month + 1}/${year}`;

        const db_format_date = `${year}/${month + 1}/${finaldates[id - fd]}`
        
        let newSchedule = {
            date: db_format_date,
            timings:'',
            scheduleId: Math.floor((Math.random() * 10000000) + 1),
            title:'',
            batchId:'',
            teacherId:''
        }
         
        this.props.updateSchedule(newSchedule)
        console.log('add event on:',date)
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
        
        const {displaySchedules,id ,finaldates , displayWeek, day ,year,month, weekday,isWeekBox,nd,fd,fpd,bpd} = this.props;

           
        const cal_date = `${finaldates[id - fd]}/${month + 1}/${year}`

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



                 if(id < fd)
                 {
                     return (
                             <div className="week_calendar_box"  id={id}>
                                 <h2 className="text-primary"></h2>
                             </div>
                     );
                 }

                return (
                    <div className="week_calendar_box" id = {id} onClick={(user.type === 'admin') ? this.addSchedule : () => {}}>
                     <h2 className="text-primary">{finaldates[id-fd]}</h2>
                     
                     <React.Fragment>
                          {
                            todaySchedules &&
                            todaySchedules.map((schedule,indx) => {
                                if(schedule)
                                 {
                                    if(schedule.teacherId === parseInt(this.props.filterId))
                                    {
                                        return (
                                          <div className="schedule_box" key={indx} style={{backgroundColor:`#${Math.floor(Math.random()*16777215).toString(16)}`}}>
                                         <p>title:{schedule.title}</p>
                                      <p>timings:{schedule.timings}</p>
                                      <p>date:{schedule.date.slice(0,10)}</p>
                                      <p>teacher id:{schedule.teacherId}</p>
                                      <p>batch id:{schedule.batchId}</p>
                                       </div>
                                   );
                                  
                               }

                               else if(parseInt(this.props.filterId) === -1)
                               {
                                   return (
                                       <div className="schedule_box" key={indx} style={{backgroundColor:`#${Math.floor(Math.random()*16777215).toString(16)}`}}>
                                      <p>title:{schedule.title}</p>
                                      <p>timings:{schedule.timings}</p>
                                      <p>date:{schedule.date.slice(0,10)}</p>
                                      <p>teacher id:{schedule.teacherId}</p>
                                      <p>batch id:{schedule.batchId}</p>
                                    </div>
                                    );
                               }
                                }
                             })
                          }
                    </React.Fragment>

                    </div>
                 );
            
    }
}

export default WeekCalendarBox;

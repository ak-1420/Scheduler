import React from 'react';

const styles = 
{
    width:'35px',
    height:'35px',
    padding:'8px',
    marginLeft:'auto',
    marginRight:'auto'
}

class DayCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    addSchedule = () => {
        var modal = document.getElementById("modal");
        modal.style.display = 'block';

        const {year , month , navDay,fpd,weekDays ,finaldates} = this.props;

        let dt = new Date().getDate() + navDay;
        
        const date = `${weekDays[(parseInt(dt) + 1) % 7]}  ${new Date().getDate() + navDay}/${month + 1}/${year}`;
         
        const db_format_date = `${year}/${month + 1}/${new Date().getDate() + navDay}`

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

        const user = (localStorage.getItem('user') !== null) ? JSON.parse(localStorage.getItem('user')) : null ;


        if(!user) {
            return (<> </>);
        }

        const {navDay,weekDays ,firstDay , numberOfDays , backPaddingsDays , frontPaddingDays ,year,month ,displaySchedules} = this.props;
        

        let dt = new Date().getDate() + navDay;


        const cal_date =  `${dt}/${month+1}/${year}`

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

        return (
            <div className="day_calendar_box" onClick={(user.type === 'admin') ? this.addSchedule : () => {}}>
                <h2 className="text-dark">{weekDays[(parseInt(dt) + 1) % 7]}</h2>
                <p style={styles}  className="round next text-white text-center day_ui">{new Date().getDate() + navDay}</p>

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
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map((indx,val) => {
                         return(
                            <div className="hours" key={indx}>
                            </div>
                         );
                })}
            </div>
        );
    }
}


export default DayCalendar;

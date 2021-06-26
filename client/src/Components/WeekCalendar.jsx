import React from 'react';
import CalendarBox from './CalendarBox';
import WeekCalendarBox from './WeekCalendarBox';

const days =[1,2,3,4,5,6,7];

class WeekCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    render() {

        const {weeks,navWeek,displayWeek , weekDays ,firstDay , numberOfDays , backPaddingsDays , frontPaddingDays ,year,month} = this.props;
        
        console.log(this.props,'from week');

        let this_week_days;

        if(weeks && weeks[navWeek])
        {
            this_week_days =  weeks[navWeek].dates
           console.log(this_week_days);
        }

        return (
            <div className="month_calendar">
                
                {
                    weekDays.map( (val,indx) => {
                        return(
                            <CalendarBox isWeekBox = {true} key={indx} id = {indx} day={indx + 1} weekday={val} />
                        );
                    })
                }

                {
                    days.map ((val,indx) => {
                       return(
                        <WeekCalendarBox setToast={this.props.setToast} displaySchedules ={this.props.displaySchedules} updateSchedule={this.props.updateSchedule} finaldates={this_week_days} displayWeek ={displayWeek[val-1]} month={month} year={year} week={weekDays} fpd={frontPaddingDays} bpd={backPaddingsDays} nd={numberOfDays} fd={7 - this_week_days.length} isWeekBox = {false} key={indx} id = {indx} day={val} weekday={weekDays[indx % 7]} /> 
                       );
                    })
                }
            </div>
        );
    }
}


export default WeekCalendar;

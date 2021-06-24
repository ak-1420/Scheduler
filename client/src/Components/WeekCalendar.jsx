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

        const {displayWeek , weekDays ,firstDay , numberOfDays , backPaddingsDays , frontPaddingDays ,year,month} = this.props;

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
                        <WeekCalendarBox displayWeek ={displayWeek[val-1]} month={month} year={year} week={weekDays} fpd={frontPaddingDays} bpd={backPaddingsDays} nd={numberOfDays} fd={firstDay} isWeekBox = {false} key={indx} id = {indx} day={val} weekday={weekDays[indx % 7]} /> 
                       );
                    })
                }
            </div>
        );
    }
}


export default WeekCalendar;

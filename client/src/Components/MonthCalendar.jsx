import React from 'react';
import CalendarBox from './CalendarBox';

let Hugedays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]
let smalldays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
class MonthCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const {weekDays ,firstDay , numberOfDays , backPaddingsDays , frontPaddingDays ,year,month} = this.props;
        
        let days = []

        if(firstDay <= 4){
          days = smalldays
        }
        else
        {
            days = Hugedays
        }

        return (
            <div className="month_calendar">
                {/* to display week columns*/}
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
                        <CalendarBox displaySchedules={this.props.displaySchedules} updateSchedule={this.props.updateSchedule} month={month} year={year} week={weekDays} fpd={frontPaddingDays} bpd={backPaddingsDays} nd={numberOfDays} fd={firstDay} isWeekBox = {false} key={indx} id = {indx} day={val} weekday={weekDays[indx % 7]} /> 
                       );
                    })
                }

            </div>
        );
    }
}

export default MonthCalendar;

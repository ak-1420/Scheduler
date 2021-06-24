import React from 'react';
import DayCalendar from './DayCalendar';
import MonthCalendar from './MonthCalendar';
import WeekCalendar from './WeekCalendar';


const WeekDays = ['Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat']

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navMonth:0,
            numberOfDays : 0,
            firstDay:0,
            frontPaddingDays:0,
            backPaddingsDays:0,
            year:0,
            month:0,
        };
    }

    componentDidMount(){
        this.getFirstDayInMonth();
        this.daysInMonth();
    }


    daysInMonth = () => {
        var now = new Date();
        var nowMonth = now.getMonth() + this.state.navMonth;
        var days = new Date(now.getFullYear(), nowMonth+1, 0).getDate();
        this.setState({
            numberOfDays:days
        },() => {
            this.setPadding();
        })
    }

    setPadding = () => {
        const {numberOfDays , firstDay} = this.state;

        let first_padding_days = firstDay - 0;

        this.setState({
            frontPaddingDays: first_padding_days,
            backPaddingsDays :35 - (numberOfDays + first_padding_days)
        })
    }

    getFirstDayInMonth = () => {

        var dt = new Date();
        var yr = dt.getFullYear();
        var mn= dt.getMonth() + this.state.navMonth;
        var firstDay = new Date(yr,mn ,1).getDay();

        this.setState({
            ...this.state,
            firstDay:firstDay,
            year:yr,
            month:mn
        })
    }


    prevMonth = () => {
        this.setState({
            navMonth: this.state.navMonth - 1
        },()=>{
            this.getFirstDayInMonth();
        this.daysInMonth();
        })
    }

    nextMonth = () => {
        this.setState({
            navMonth: this.state.navMonth + 1
        },()=>{
            this.getFirstDayInMonth();
           this.daysInMonth();
        })
    }

    render() {

       
        const {viewMode} = this.props;

        return (
            <div className="calender">

                 <div className="prev-next-month">
                   <span onClick={this.prevMonth}  className="previous round">&#8249;</span>
                   <span onClick={this.nextMonth} className="next round">&#8250;</span>
                 </div>

               {(viewMode === 'Month') && <MonthCalendar month={this.state.month} year={this.state.year} frontPaddingDays={this.state.frontPaddingDays} backPaddingsDays={this.state.backPaddingsDays} numberOfDays={this.state.numberOfDays} firstDay={this.state.firstDay} navMonth = {this.state.navMonth} weekDays ={WeekDays} />}
               {(viewMode === 'Week') && <WeekCalendar weekDays ={WeekDays}/>}
               {(viewMode === 'Day') && <DayCalendar />}

            </div>
        );
    }
}

export default Calendar;

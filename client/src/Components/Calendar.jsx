import React from 'react';
import DayCalendar from './DayCalendar';
import MonthCalendar from './MonthCalendar';
import WeekCalendar from './WeekCalendar';


const WeekDays = ['Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat']
const Months = ['January' , 'February' ,'March' , 'April' ,'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December']

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
            displayWeek:[]
        };
    }

    componentDidMount(){
        this.getFirstDayInMonth();
        this.daysInMonth();
        this.tryWeekDays();
    }

    tryWeekDays = () => {
        let curr = new Date()
        let week = []

        for (let i = 0; i <= 6; i++) {
            let first = curr.getDate()  - curr.getDay() + i
            let day = new Date(curr.setDate(first )).toString() //.slice(0, 10)
            week.push(day)
        }

        this.setState({
            displayWeek:week
        },()=>{
            console.log(this.state.displayWeek)
        })
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
        var mn = dt.getMonth() + this.state.navMonth;
        var firstDay = new Date(yr,mn,1).getDay();

        let modifiedYear = yr;

        mn = mn + 1;
        
        if(mn < 1)
        {
            modifiedYear = yr - ( Math.ceil((-1 * mn + 1) / 12));
        }
        else if(mn > 12)
        {
           modifiedYear = yr + Math.floor(mn / 12);
        }

        if(mn > 12 )
        {
              mn = mn % 12;
        }

        if( mn < 1)
        {
            mn = 12 - ( (mn * -1) % 12);
        }

        this.setState({
            ...this.state,
            firstDay:firstDay,
            year: modifiedYear,
            month: mn - 1
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

                {/* previous next buttons common for all views */}
                 <div className="prev-next-month">
                   <span onClick={this.prevMonth}  className="previous round">&#8249;</span>
                   <span onClick={this.nextMonth} className="next round">&#8250;</span>
                 </div>

                 {/* display month and year common for all views */}

                 <div className="display_month_year">
                     <h4 className="text-dark">{`${Months[this.state.month]} - ${this.state.year}`}</h4>
                 </div>

               {(viewMode === 'Month') && <MonthCalendar month={this.state.month} year={this.state.year} frontPaddingDays={this.state.frontPaddingDays} backPaddingsDays={this.state.backPaddingsDays} numberOfDays={this.state.numberOfDays} firstDay={this.state.firstDay} navMonth = {this.state.navMonth} weekDays ={WeekDays} />}
               {(viewMode === 'Week') && <WeekCalendar displayWeek={this.state.displayWeek} month={this.state.month} year={this.state.year} frontPaddingDays={this.state.frontPaddingDays} backPaddingsDays={this.state.backPaddingsDays} numberOfDays={this.state.numberOfDays} firstDay={this.state.firstDay} navMonth = {this.state.navMonth} weekDays ={WeekDays} />}
               {(viewMode === 'Day') && <DayCalendar month={this.state.month} year={this.state.year} frontPaddingDays={this.state.frontPaddingDays} backPaddingsDays={this.state.backPaddingsDays} numberOfDays={this.state.numberOfDays} firstDay={this.state.firstDay} navMonth = {this.state.navMonth} weekDays ={WeekDays} />}

            </div>
        );
    }
}

export default Calendar;

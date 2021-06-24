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
        const {year , month , day,fpd,weekday} = this.props;
        
        const date = `${weekday}  ${day - fpd}/${month + 1}/${year}`;
        console.log('add event on:',date)
        window.alert(`add event on ${date}`)
    }

    render() {
        
        //nd: number of days in the month
        //fd: first day in the month
        //fpd: front padding days
        //bpd: back padding days

        const {id ,displayWeek, day , weekday,isWeekBox,nd,fd,fpd,bpd} = this.props;


                return (
                    <div className="week_calendar_box" id = {id} >
                     <h2 className="text-primary">{displayWeek.substr(7,3)}</h2>
                     
                     {/* draw 24 cols */} 
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

export default WeekCalendarBox;

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

        const {id , day , weekday,isWeekBox,nd,fd,fpd,bpd} = this.props;

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
                    <div className="calendar_box" id = {id}   onClick={ this.addSchedule }>
                     <h2 className="text-primary">{day - fpd}</h2>
                    </div>
                 );
            }
            else
            {
                // day in either prev or next month
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

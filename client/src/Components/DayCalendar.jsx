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
        const {year , month , navDay,fpd,weekDays ,finaldates} = this.props;

        let dt = new Date().getDate() + navDay;
        
        const date = `${weekDays[(parseInt(dt) + 1) % 7]}  ${new Date().getDate() + navDay}/${month + 1}/${year}`;
        console.log('add event on:',date)
        window.alert(`add event on ${date}`)
    }

    render() {

        const {navDay,weekDays ,firstDay , numberOfDays , backPaddingsDays , frontPaddingDays ,year,month} = this.props;
        

        let dt = new Date().getDate() + navDay;

        return (
            <div className="day_calendar_box" onClick={this.addSchedule}>
                <h2 className="text-dark">{weekDays[(parseInt(dt) + 1) % 7]}</h2>
                <p style={styles}  className="round next text-white text-center day_ui">{new Date().getDate() + navDay}</p>
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

import React from 'react';
import DayCalendar from './DayCalendar';
import Modal from './Modal';
import MonthCalendar from './MonthCalendar';
import WeekCalendar from './WeekCalendar';


const WeekDays = ['Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat']
const Months = ['January' , 'February' ,'March' , 'April' ,'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December']

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teacher_to_filter:-1,
            teachers_list_for_filter:[],
            ismanualSchedule:false,
            schedules:[],
            navMonth:0,
            numberOfDays : 0,
            firstDay:0,
            frontPaddingDays:0,
            backPaddingsDays:0,
            year:0,
            month:0,
            displayWeek:[],
            navWeek:0,
            navDay:0,
            weeks:[],
            schedule:{
                date:'',
                timings:'',
                batchId:'',
                teacherId:'',
                title:'',
                scheduleId:''
            }
        };
    }

    componentDidMount(){
        this.getFirstDayInMonth();
        this.daysInMonth();
        this.tryWeekDays();
        this.fetchSchedules();
        this.fetchTeachers();
    }


    fetchTeachers = () => {
        const url = `https://api-classroom-scheduler.herokuapp.com/api/v1/users`

        fetch(url).then( (response) => response.json())
        .then( (data) => {
            console.log('teachers fetched:',data);
            this.setState({
                ...this.state,
                teachers_list_for_filter:data.data
            },()=>{
                console.log('teachers:',this.state.teachers_list_for_filter);
            })
        })
    }


    fetchSchedules = () => {
        const url = `https://api-classroom-scheduler.herokuapp.com/api/v1/schedules/`
        
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            console.log('data from schedules:',data);
            this.setState({
                ...this.state,
                schedules:data.data
            },() => {
                console.log('schedules in ui ',this.state.schedules)
            })
        }).catch((error)=>{
            console.log('error:',error)
        })

    }

    updateSchedule = (newSchedule) => {
        this.setState({
            schedule:newSchedule
        })
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
        },()=>{
            this.getWeeks();
        })
    }


    prevWeek = () => {
        this.setState({
            navWeek:this.state.navWeek - 1
        },()=>{
            this.getWeeks();
            console.log(this.state.navWeek , 'navweek')
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

    nextWeek = () => {
        this.setState({
            navWeek:this.state.navWeek + 1
        },()=>{
            this.getWeeks();
            console.log(this.state.navWeek , 'navweek')
        })
    }

    // get weeks array of given year and month

    getWeeksInMonth = (year, month) => {

        const weeks = [],
          firstDate = new Date(year, month, 1),
          lastDate = new Date(year, month + 1, 0),
          numDays = lastDate.getDate();
      
        let dayOfWeekCounter = firstDate.getDay();
      
        for (let date = 1; date <= numDays; date++) {
          if (dayOfWeekCounter === 0 || weeks.length === 0) {
            weeks.push([]);
          }
          weeks[weeks.length - 1].push(date);
          dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
        }
      
        return weeks
          .filter((w) => !!w.length)
          .map((w) => ({
            start: w[0],
            end: w[w.length - 1],
            dates: w,
          }));
      }

      getWeeks = () => {
          const {year,month,firstDay,navWeek} = this.state;

          console.log('first day of the month:',firstDay );

          const weeks_of_month = this.getWeeksInMonth(year,month);

          this.setState({
              weeks:weeks_of_month,
          },()=>{
              console.log('week days list:',this.state);
          })

      }

      nextDay = () => {
          this.setState({
              navDay : this.state.navDay + 1
          })
      }

      prevDay = () => {
          this.setState({
              navDay: this.state.navDay - 1
          })
      }

      setScheduleWithManualDate = () => {
          //this method is to add a schedule manually
         this.setState({
             ismanualSchedule : true
         },()=>{
              //show modal
              var modal = document.getElementById("modal");
              modal.style.display = 'block';
         })
      }


      filterTeacher = (e) => {
             this.setState({
                 teacher_to_filter : e.target.value
             },()=>{
                 console.log('filter by teacher id:',this.state.teacher_to_filter)
             })
      }

      
    render() {

        const user = (localStorage.getItem('user') !== null) ? JSON.parse(localStorage.getItem('user')) : null ;


        const {viewMode} = this.props;
        const {teachers_list_for_filter} = this.state;

        return (
            <div className="calender"> 
              
            {/* filter by teacher  */}
            <div className="step-header">
            {(user && user.type === 'admin') && <button title="add a schedule" className="button btn-schedule" onClick = {this.setScheduleWithManualDate}>+</button>}


                  <div className="display_month_year"> 
                     <h4 className="text-dark">{`${Months[this.state.month]} - ${this.state.year}`}</h4>
                 </div>

              {/* test view */}
              {
                     (viewMode === 'Month') &&
                     <div className="prev-next-month">
                       <span onClick={this.prevMonth}  className="previous round">&#8249;</span>
                       <span onClick={this.nextMonth} className="next round">&#8250;</span>
                   </div>
                 }

                {
                     (viewMode === 'Week') &&
                     
                     <div className="prev-next-month">
                       <span onClick={this.prevWeek}  className="previous round">&#8249;</span>
                       <span onClick={this.nextWeek} className="next round">&#8250;</span>
                     </div>
                 }

                {
                     (viewMode === 'Day') && 
                     <div className="prev-next-month">
                       <span onClick={this.prevDay}  className="previous round">&#8249;</span>
                       <span onClick={this.nextDay} className="next round">&#8250;</span>
                   </div>
                 }

                 {/* display month and year common for all views */}

                 <div className="calender_view teacher-filter" style={{zIndex:10}}>

                <select  name="teacherId" id="selectTeacher"  title="filter by teacher id" onClick={this.filterTeacher}>
                <option value={-1}>filter by teacher id</option>
                    {
                        (teachers_list_for_filter) && teachers_list_for_filter.map((teacher,indx ) => {
                            if(teacher.type === 'teacher')
                            return <option key={indx} value={teacher.id}>{teacher.email}</option>
                        })
                    }
                </select>
            </div>


              {/* test view */}
            </div>

           
 
               <Modal isManualDate = {this.state.ismanualSchedule} setToast={this.props.setToast} schedule = {this.state.schedule}/>

                {/* previous next buttons common for all views */}

                 {
                //      (viewMode === 'Month') &&
                //      <div className="prev-next-month">
                //        <span onClick={this.prevMonth}  className="previous round">&#8249;</span>
                //        <span onClick={this.nextMonth} className="next round">&#8250;</span>
                //    </div>
                 }

                {
                    //  (viewMode === 'Week') &&
                     
                    //  <div className="prev-next-month">
                    //    <span onClick={this.prevWeek}  className="previous round">&#8249;</span>
                    //    <span onClick={this.nextWeek} className="next round">&#8250;</span>
                    //  </div>
                 }

                {
                //      (viewMode === 'Day') && 
                //      <div className="prev-next-month">
                //        <span onClick={this.prevDay}  className="previous round">&#8249;</span>
                //        <span onClick={this.nextDay} className="next round">&#8250;</span>
                //    </div>
                 }

                 {/* display month and year common for all views */}

                 {/* <div className="display_month_year">
                     <h4 className="text-dark">{`${Months[this.state.month]} - ${this.state.year}`}</h4>
                 </div> */}

               {(viewMode === 'Month') && <MonthCalendar filterId = {this.state.teacher_to_filter} setToast={this.props.setToast} displaySchedules={this.state.schedules} updateSchedule={this.updateSchedule} month={this.state.month} year={this.state.year} frontPaddingDays={this.state.frontPaddingDays} backPaddingsDays={this.state.backPaddingsDays} numberOfDays={this.state.numberOfDays} firstDay={this.state.firstDay} navMonth = {this.state.navMonth} weekDays ={WeekDays} />}
               {(viewMode === 'Week') && <WeekCalendar filterId = {this.state.teacher_to_filter} setToast={this.props.setToast} displaySchedules={this.state.schedules} updateSchedule={this.updateSchedule} weeks = {this.state.weeks} navWeek={this.state.navWeek} displayWeek={this.state.displayWeek} month={this.state.month} year={this.state.year} frontPaddingDays={this.state.frontPaddingDays} backPaddingsDays={this.state.backPaddingsDays} numberOfDays={this.state.numberOfDays} firstDay={this.state.firstDay} navMonth = {this.state.navMonth} weekDays ={WeekDays} />}
               {(viewMode === 'Day') && <DayCalendar filterId = {this.state.teacher_to_filter} setToast={this.props.setToast} displaySchedules={this.state.schedules} updateSchedule={this.updateSchedule} navDay={this.state.navDay} month={this.state.month} year={this.state.year} frontPaddingDays={this.state.frontPaddingDays} backPaddingsDays={this.state.backPaddingsDays} numberOfDays={this.state.numberOfDays} firstDay={this.state.firstDay} navMonth = {this.state.navMonth} weekDays ={WeekDays} />}

            </div>
        );
    }
}

export default Calendar;

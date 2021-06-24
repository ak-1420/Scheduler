import React from 'react';

class DateByView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="calender_view">
                <select name="calender_view" id="calenderView">
                    <option selected={true} value="Month">Month</option>
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                </select>
            </div>
        );
    }
}

export default DateByView;

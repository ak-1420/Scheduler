import React from 'react';

class DateByView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (e) => {
        const view_mode = e.target.value
        this.props.changeViewMode(view_mode);
    }



    render() {
        return (
            <div className="calender_view">
                <select name="calender_view" id="calenderView" onChange={this.handleChange}>
                    <option value="Month">Month</option>
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                </select>
            </div>
        );
    }
}

export default DateByView;

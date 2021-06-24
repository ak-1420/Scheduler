import React from 'react';
import Header from "./Header";
import Main from "./Main";


class DataProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab:'calender'
        };
    }

    changeTab = (value) => {
        this.setState({
          tab:value
        },()=>{
            console.log('path changed',this.state);
        })
    }

    render() {
        const {tab} =  this.state;

        return (
            <div>
                <Header  path={tab} navigate={this.changeTab} />
                <Main path={tab} navigate={this.changeTab}/>
            </div>
        );
    }
}

export default DataProvider;

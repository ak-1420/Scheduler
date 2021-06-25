import React from 'react';
import Header from "./Header";
import Main from "./Main";


class DataProvider extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tab:'calendar',
            viewMode:'Month',
            navMonth:0
        };
    }

    changeTab = (value) => {
        this.setState({
          tab:value
        },()=>{
            console.log('path changed',this.state);
        })
    }

    changeViewMode = (value) => {
        this.setState({
            ...this.state,
            viewMode:value
        })
    }

    render() {
        const {tab , viewMode } =  this.state;

        return (
            <div>
                <Header   changeViewMode = {this.changeViewMode} path={tab} navigate={this.changeTab} />
                <Main  viewMode = {viewMode} path={tab} navigate={this.changeTab}/>
            </div>
        );
    }
}

export default DataProvider;

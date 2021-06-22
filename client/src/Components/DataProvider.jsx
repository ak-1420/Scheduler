import React from 'react';
import Header from "./Header";
import Main from "./Main";
import SideDrawer from "./SideDrawer";


class DataProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openSidebar = () => {
        document.getElementById("auth-drawer").style.width = "50%";
    }
    
    closeSidebar = () => {
        document.getElementById("auth-drawer").style.width = "0";
    }


    render() {
        return (
            <div>
                <Header openDrawer = {this.openSidebar} closeDrawer = {this.closeSidebar}/>
                <Main openDrawer = {this.openSidebar} closeDrawer = {this.closeSidebar}/>
                <SideDrawer closeDrawer = {this.closeSidebar}/>
            </div>
        );
    }
}

export default DataProvider;

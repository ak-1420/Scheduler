import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Toast from './Toast';


class DataProvider extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tab:'calendar',
            viewMode:'Month',
            navMonth:0,
            message:{
                type:'',
                data:''
            }
        };
    }


    componentDidMount(){
       
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

    showToast = () => {
       var toast = document.getElementById('toast');
        toast.style.display =  'block';
        setTimeout(()=>{
            this.fadeOut();

        },5000);
    }

    fadeOut = () => {
        var fadeToast = document.getElementById("toast");
       var fadeEffect = setInterval(function () {
        if (!fadeToast.style.opacity) {
            fadeToast.style.opacity = 1;
        }
        if (fadeToast.style.opacity > 0) {
            fadeToast.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            fadeToast.style.display = 'none'
            fadeToast.style.opacity = 1;

        }
       }, 200);
    }

    updateMessage = (msg) => {
      this.setState({
          ...this.state,
          message:{
              type:msg.type,
              data:msg.data
          }
      },()=>{
          this.showToast();
      })
    }
    

    render() {
        const {tab , viewMode } =  this.state;

        return (
            <div>
                <Toast message={this.state.message} />
                <Header setToast={this.updateMessage} changeViewMode = {this.changeViewMode} path={tab} navigate={this.changeTab} />
                <Main setToast ={this.updateMessage} viewMode = {viewMode} path={tab} navigate={this.changeTab}/>
            </div>
        );
    }
}

export default DataProvider;

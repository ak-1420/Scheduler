import React from 'react';

class Toast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {message} = this.props;

        if(message.type !== '')
        {
            return (
            <div className={`toast-container toast-${message.type}`} id="toast">

                <h3 className="toast-text">{message.data}</h3>
            </div>
        );
       }
        else  return (<></>);

    }
}

Toast.propTypes = {};

export default Toast;

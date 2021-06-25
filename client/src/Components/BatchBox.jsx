import React from 'react';

var visited = [];

class BatchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
           const  {batchId,name} = this.props;

           if(!visited[batchId]){ 
            visited[batchId] = true;
              return (
                   <div className="batch-box" id={batchId}>
                      <h4> Name: {name}</h4>
                      <h4> ID : {batchId} </h4>
                   </div>
              );
           }
           else return (<> </>);

    }
}

BatchBox.propTypes = {};

export default BatchBox;

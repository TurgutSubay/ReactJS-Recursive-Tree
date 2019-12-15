import React from 'react'
import {store} from './index';
import {connect} from 'react-redux';

const leftSide = {
    float: 'left',
    width: '20%',
    height:'90vh',
    marginTop: '0px',
    marginLeft: '0px',
    backgroundColor:'#333',
    padding:'10px',
    color:'#ccc'
  }

class RightSide extends React.Component {

  render(){
      return <div style={leftSide}>                
          <div>Active Element: {this.props.id}</div> 
          <div>Active Parent : {this.props.parent}</div>          
      </div>
  }
}

function mapStateToProps(state) {
    return { 
        id:state.reduceData.activeElement, 
        parent:state.reduceData.parents
    }
}
  
export default connect(mapStateToProps) (RightSide);
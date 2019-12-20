import React from 'react'
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
const tNbr={
    width: '70px',
    color:'black'
}

class RightSide extends React.Component {
    state = {
        text:'18'
    }
  
 textSize(e){
    this.setState({ text: e.target.value })    
    this.props.upDown(e.target.value);
 }    
  render(){
      return <div style={leftSide}>                
          <div>Active Element: {this.props.id}</div> 
          <div>Active Parent : {this.props.parent}</div>
          <div>Text Size: <input type="number" style={tNbr} name="quantity" min="10" max="50"  className="form-control"
           value={this.state.text}
           onChange={e => this.textSize(e)}/> 
           </div>
      </div>
  }
}

function mapStateToProps(state) {
    return {
        id:state.reduceData.activeElement, 
        parent:state.reduceData.parents
    }
}
const mapDispatchToProps = dispatch => {
    return {
      upDown: (value) => dispatch({ type: 'textSizeUpDown',payLoad: value}),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps) (RightSide);
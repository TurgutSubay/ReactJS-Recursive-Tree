import React from 'react';
import { store } from './index';
import { addChild, updataTextData, deleteData } from './data';
import { connect } from 'react-redux';
import {myRefArr,instance} from './App';

const addCSS = {
  'backgroundColor': '#335577',
  'marginBottom' : '0px',
  'borderRadius': '0px',
  'border' : '0px',
  'height': '40px',
}

const updateText = (e) => {
  e.stopPropagation();
  let sText = document.getElementById('myText').value;
  let id = store.getState().reduceData.activeElement;
  updataTextData(id, sText)
    .then((serverData) => {
      // store.dispatch({ type: 'set', payLoad: serverData.data});    
    })
    .catch(err => console.log('There was an error:' + err));
}

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
    }    
    this.navAria = React.createRef();    
  }
 
  deleteElement = (e) => {
    let deletOrNot = window.confirm("Do you want to delete current item?");
    if (deletOrNot) {
      let id = store.getState().reduceData.activeElement;
      deleteData(id)
        .then((serverData) => {
          console.log('activElement: '+serverData.activElement);         
          store.dispatch({ type: 'set', payLoad: serverData.data });         
          instance.showData(serverData.activElement,1, serverData.parent);  
        })
        .catch(err => console.log('There was an delete element error:' + err));
    }
  }
  
  AddElement = (e) => {
    let parent = this.props.activeElement; //store.getState().reduceData.activeElement;
    if (e.target.id === 'newRoot'){
      parent = 0;
    }
    document.getElementById("aaa").innerText = parent;
    let sText = document.getElementById('myText').value;
    let sCaption = document.getElementById('myCaption').value;
    if (sCaption.length < 1) {
      alert(parent + '  Caption needs ');
    } else {
      addChild(parent, sText, sCaption)
        .then((serverData) => {        
          store.dispatch({ type: 'set', payLoad: serverData.data });         
          instance.showData(serverData.newAdded, 1,serverData.parent);
        })
        .catch(err => console.log('There was an add element error:' + err));
    }
  }

render(){
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={addCSS} id='navAria'  ref={this.navAria}>
      <a className="navbar-brand" href="index.html"><span id="aaa"></span></a>
      <div className="form-inline top10">
       <input type="text" id="myCaption" placeholder="Caption" className="form-control mr-sm-2" />&nbsp;&nbsp;
       <button type="button" className="btn btn-success form-inline" id= "newChild" onClick={(e) => this.AddElement(e)}>New Child</button>&nbsp;&nbsp;
       <button type="button" className="btn btn-success form-inline" id="newRoot" onClick={(e) => this.AddElement(e)}>New Root</button>&nbsp;&nbsp;
       <button type="button" className="btn btn-warning form-inline" onClick={(e) => updateText(e)}>Current Text Server Update </button>&nbsp;&nbsp;
       <button type="button" className="btn btn-danger form-inline" onClick={(e) => this.deleteElement(e)}>Delete</button>
      </div>
    </nav>
  );
  }
}
function mapStateToProps(state) {
  return {
    myTextarea: state.reduceData.myTextarea,
    text: state.reduceData.text,
    id: state.reduceData.activeElement,
    data: state.reduceData.data,
    activeElement: state.reduceData.activeElement
  }
}

export default connect(mapStateToProps)(Nav);

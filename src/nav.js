import React from 'react';
import { store } from './index';
import { addChild, updataTextData, deleteData } from './data';
import { connect } from 'react-redux';
import {appData, myRefArr} from './App';

const addCSS = {
  'backgroundColor': '#ccc'
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

const deleteText = (e) => {
  e.stopPropagation();
  if (window.confirm("Do you want to delete current item?")) {
    let id = store.getState().reduceData.activeElement;
    deleteData(id)
      .then((serverData) => {
        store.dispatch({ type: 'set', payLoad: serverData.data });
        alert(serverData.data);
      })
      .catch(err => console.log('There was an error:' + err));
  }
}
class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  
  showData(e) { 
    let id = e.target.id;
    console.log('target:'+id);
    if (this.props.activeElement > 0) {
      if (myRefArr[this.props.activeElement].current.nodeName === 'BUTTON') {
        myRefArr[this.props.activeElement].current.classList.add('btn-primary');
        myRefArr[this.props.activeElement].current.classList.remove('btn-success');
      }
      if (myRefArr[this.props.activeElement].current.nodeName === 'UL') {
        document.getElementById(this.props.activeElement).classList.add('btn-danger');
        document.getElementById(this.props.activeElement).classList.remove('btn-success');
      }
    }
    if (myRefArr[id].current.nodeName === 'BUTTON') {
      myRefArr[id].current.classList.remove('btn-primary');
      myRefArr[id].current.classList.remove('btn-danger');
      myRefArr[id].current.classList.add('btn-success');
    }
    if (myRefArr[id].current.nodeName === 'UL') {
      document.getElementById(id).classList.remove('btn-danger');
      document.getElementById(id).classList.add('btn-success');
    }

    let stext = "";
    appData.forEach(element => {
      if (element.id === id) {
        stext = element.text;
      }
    });

    let node = myRefArr[0].current;
    node.value = stext;
    let parent = this.props.activeElement;
    console.log('showData Parent :'+parent);   
    store.dispatch({ type: 'setElement', payLoad: id, parents: parent, text: stext });
  }

  AddElement = () => {
    let parent = this.props.activeElement; //store.getState().reduceData.activeElement;
    document.getElementById("aaa").innerText = parent;
    let sText = document.getElementById('myText').value;
    let sCaption = document.getElementById('myCaption').value;
    if (sCaption.length < 1) {
      alert(parent + ' ' + sCaption);
    } else {
      addChild(parent, sText, sCaption)
        .then((serverData) => {        
          store.dispatch({ type: 'set', payLoad: serverData.data });
          this.showData({target:{id:serverData.newAdded}});         
        })
        .catch(err => console.log('There was an error:' + err));
    }
  }
render(){
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={addCSS}>
      <a className="navbar-brand" href="index.html"><span id="aaa"></span></a>
      <div className="form-inline top10">
        <input type="text" id="myCaption" placeholder="Caption" className="form-control mr-sm-2" />&nbsp;&nbsp;
       <button type="button" className="btn btn-success form-inline" onClick={() => this.AddElement()}>Add New</button>&nbsp;&nbsp;
       <button type="button" className="btn btn-warning form-inline" onClick={(e) => updateText(e)}>Current Text Server Update </button>&nbsp;&nbsp;
       <button type="button" className="btn btn-danger form-inline" onClick={(e) => deleteText(e)}>Delete</button>
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

import React from 'react';
import {store} from './index';
import {addChild, updataTextData, deleteData} from './data';

const addCSS={
  'backgroundColor' : '#ccc' 
}

const AddElement = ()=>{    
  let parent = store.getState().reduceData.activeElement; 
  document.getElementById("aaa").innerText= parent;
  let sText = document.getElementById('myText').value;  
  let sCaption = document.getElementById('myCaption').value;
  if (sCaption.length<1){
    alert(parent + ' ' + sCaption);
  }else{ 
  addChild(parent, sText, sCaption)
  .then((serverData) => {
    alert(serverData.data);
    store.dispatch({ type: 'set', payLoad: serverData.data});
    })
  .catch(err => console.log('There was an error:' + err)); 
  }
}

const updateText = (e)=>{
  e.stopPropagation();
  let sText = document.getElementById('myText').value;  
  let id = store.getState().reduceData.activeElement;
  updataTextData(id, sText)
  .then((serverData) => {  
    store.dispatch({ type: 'set', payLoad: serverData.data});
    })
  .catch(err => console.log('There was an error:' + err));
} 

const deleteText = (e)=>{
  e.stopPropagation();
  if (window.confirm("Do you want to delete current item?")) {
    let id = store.getState().reduceData.activeElement;
    deleteData(id)
    .then((serverData) => {  
      store.dispatch({ type: 'set', payLoad: serverData.data});
      alert(serverData.data);
      })
    .catch(err => console.log('There was an error:' + err));
    }
} 

function Nav() {
  return (   
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={addCSS}>
     <a className="navbar-brand" href="index.html"><span id="aaa"></span></a>     
     <div className="form-inline top10">     
       <input type="text" id="myCaption" placeholder="Caption" className="form-control mr-sm-2"/>&nbsp;&nbsp;       
       <button type="button" className="btn btn-success form-inline" onClick={()=>AddElement()}>Add New</button>&nbsp;&nbsp;
       <button type="button" className="btn btn-success form-inline" onClick={(e)=>updateText(e)}>Update Text</button>&nbsp;&nbsp;
       <button type="button" className="btn btn-danger form-inline" onClick={(e)=>deleteText(e)}>Delete</button>
     </div>
    </nav> 
  );
}

export default Nav;

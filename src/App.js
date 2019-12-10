import React from 'react';
import Nav from './nav.js'
import './css/App.css';
import {Data, AppendChild} from './data.js';
import { store } from './index.js';
import { set_data } from './reducers/allReducers.js'

const styleLeft = {
  float: 'left',
  width: '30%',
  backgroundColor:'#F6DDCC',
  overflow: 'auto',
  height: '100vh'
}
const styleLeft2 = {
  float: 'left',
  width: '68%',
  marginTop: '0px',
  marginLeft: '0px',
  backgroundColor:'#F6DDCC',
  padding:'10px'
}
var appData;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      liCSS: 'nestedClosed',
      listLi: []
    }
  }

  myfetch(mydata) {
    this.setState({ data: mydata });
  }

  componentDidMount() {
    Data('user').then((serverData) => {
      this.setState({ data: serverData.data })
      store.dispatch({ type: 'set', payLoad: serverData.data });
      })
      .catch(err => console.log('There was an error:' + err));
    console.log('componentDidMount');
  }

  setCSS(e) {
    let id = e.target.title;
    console.log(id + "-" + document.getElementById(id).className);
    if (document.getElementById(id).className === 'nestedClosed') {
      document.getElementById(id).classList.remove('nestedClosed');
      document.getElementById(id).classList.add('nestedShow');
      document.querySelector("[title='" + id + "']").classList.add('myCaret-down');
    } else {
      document.getElementById(id).classList.remove('nestedShow');
      document.getElementById(id).classList.add('nestedClosed');
      document.querySelector("[title='" + id + "']").classList.remove('myCaret-down');
    }
  }
  showData(e) {
    appData = this.state.data;
    let row =  e.target.value;
    let id=-1;
    if(e.target.hasAttribute('title')){
       id =  e.target.title;
    }else{
      id =  e.target.id;
    }
    
    let text="";
    appData.forEach(element => {
      if (element.id == id){
        text =element.text;
      }
    });       
     document.getElementById('myText').innerText = text;
  }

  query(parentRow, startRow) {
    let arrCh = [];
    appData = this.state.data;
    //console.log('P:' + parentRow + ' ' + appData.length);
    for (let row1 = 0; row1 < appData.length; row1++) {
      if (Number(appData[row1].parent) === Number(parentRow)) {
        arrCh.push(
          row1
        );
      }
    }
    return arrCh;
  }

  tree_(parentRow, startRow) {
    appData = this.state.data;
    if (appData.length === 0) {
      return;
    }
    let eArry = [];
    var arry = this.query(parentRow, startRow);

    for (var row = 0; row < arry.length; row++) {
      let i = arry[row];
      let id = appData[i].id;
      let parent = appData[i].parent;
      let text = appData[i].text;
      let caption = appData[i].caption;

      if ((i + 1) < appData.length && appData[i + 1].parent === id) {
        eArry.push(
          <li  value={id} ref={id} key={id} draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={(e) => this.allowDrop(e)}  onDrop={(e)=>this.drop(e)}>
            <span value={id} title={id} className="myCaret" onClick={(id) => this.setCSS(id)}>
              <div  title={id} value={row} className="btn btn-danger addBtnTop" onClick={(e) => this.showData(e)}>NO:{row}- P:{parent} id: {id}-- {caption}</div>
            </span>
            <ul value={id} id={id} ref={id} className={this.state.liCSS} data={text}>
              {this.tree_(id, id)}
            </ul>
          </li>
        );
      } else {
        eArry.push(
          <li value={id} draggable="true" onDragStart={(e) => this.drag(e)}  onDragOver={(e) => this.allowDrop(e)}  onDrop={(e)=>this.drop(e)}  key={id} data1={text}><span className="myCaret"></span>
            <button title={id} id={id} type="button" className="btn btn-primary addBtnTop" onClick={(e) => this.showData(e)}>ID : {id} ; P : {parent} - {caption}</button>
          </li>);
      }
    }
    return eArry;
  }
  allowDrop(e) {    
    e.preventDefault();   
  }
  
  drag(e){        
    let id =  e.target.value;
    e.dataTransfer.setData("text", id);
  }

  drop(e) {
    e.preventDefault();
    let parent= e.target.value;
   
    if(e.target.hasAttribute('title')){
      parent =  e.target.title;
     }else{
      parent =  e.target.id;
    }

    let child = e.dataTransfer.getData("text");
   // alert(parent +" - " +child);       
    AppendChild(parent, child).then((serverData) => {
      this.setState({ data: serverData.data })
      store.dispatch({ type: 'set', payLoad: serverData.data });
      })
      .catch(err => console.log('There was an error:' + err));
    //e.target.appendChild(document.getElementById(data));
  }
  render() {
    console.log('render');
    return <div>
      <Nav />
      <div title="0" style={styleLeft} onDragOver={(e) => this.allowDrop(e)}  onDrop={(e)=>this.drop(e)}>
        <ul className="myUL">
          {this.tree_(0, 0)}
        </ul>
      </div>
      <div id="myText" style={styleLeft2}></div>
    </div>
  };
}
export default App;
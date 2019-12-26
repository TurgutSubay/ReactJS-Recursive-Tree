import React from 'react';
import Nav from './nav.js'
import './css/App.css';
import {Data, changeParent} from './data.js';
import { store } from './index.js';
import  RightSide from './rightSide';
import {connect} from 'react-redux';

const styleLeft = {
  float: 'left',
  width: '20%',
  backgroundColor:'#333',
  overflow: 'auto',
  height: '90vh'
}
const styleLeft2 = {
  float: 'left',
  width: '60%',
  height:'90vh',
  marginTop: '0px',
  marginLeft: '0px',
  backgroundColor:'#333',
  padding:'10px'
}

var appData;
var myRefArr=[];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      liCSS: 'nestedClosed',
      listLi: [],
      text:"",
      myRefArr:[],
      ii:0
    }
    this.myRef = React.createRef();
  }
  refCreate(id){
   //this.state.myRefArr[id] = React.createRef();
   myRefArr[id] = React.createRef();
  }

  componentDidMount() {
    this.refCreate(this.state.ii);
    this.state.ii = this.state.ii +1;
    Data('user').then((serverData) => {
      this.setState({ data: serverData.data })
      store.dispatch({ type: 'set', payLoad: serverData.data });
      })
      .catch(err => console.log('There was an error:' + err));   
    console.log('App componentDidMount');
  }

  setCSS(e) {
    let id = e.target.id;  
    //alert('setCSS'+id)  
    console.log(id + "-" + myRefArr[id].current.className);// document.getElementById(id).className);
    if ( myRefArr[id].current.className === 'nestedClosed') {
      myRefArr[id].current.classList.remove('nestedClosed');
      myRefArr[id].current.classList.add('nestedShow');
      document.getElementById(id).classList.add('myCaret-down');      
    } else {
      myRefArr[id].current.classList.remove('nestedShow');
      myRefArr[id].current.classList.add('nestedClosed');
      document.getElementById(id).classList.remove('myCaret-down');
    }
  }

  showData(e) {    
    appData = this.state.data;  
    appData = this.props.data;
    let id=-1;    
    id =  e.target.id;   
   
    if (this.props.activeElement>0){      
       if(myRefArr[this.props.activeElement].current.nodeName ==='BUTTON'){
          myRefArr[this.props.activeElement].current.classList.add('btn-primary');
          myRefArr[this.props.activeElement].current.classList.remove('btn-success');
        }
      if(myRefArr[this.props.activeElement].current.nodeName ==='UL'){
        document.getElementById(this.props.activeElement).classList.add('btn-danger'); 
        document.getElementById(this.props.activeElement).classList.remove('btn-success'); 
      }
    }
    if(myRefArr[id].current.nodeName ==='BUTTON'){
      myRefArr[id].current.classList.remove('btn-primary');
      myRefArr[id].current.classList.remove('btn-danger');
      myRefArr[id].current.classList.add('btn-success');
    }
    if(myRefArr[id].current.nodeName ==='UL'){
      document.getElementById(id).classList.remove('btn-danger'); 
      document.getElementById(id).classList.add('btn-success'); 
    }
   
    let stext="";
    appData.forEach(element => {
      if (element.id === id){
        stext =element.text;
      }
    });          
    // 
   let  node = myRefArr[0].current;//this.myRef.current;
   node.value = stext;
   let parent = -1;
   if(e.target.hasAttribute('parent')){
     parent = e.target.getAttribute('parent');    
   }
   store.dispatch({ type: 'setElement', payLoad: id, parents:parent ,text:stext});
  }

  query(parentRow, startRow) {
    let arrCh = [];
    appData = this.state.data;
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
      this.refCreate(id);

      if ((i + 1) < appData.length && appData[i + 1].parent === id) {
        eArry.push(
          <li  key={id} draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={(e) => this.allowDrop(e)}  onDrop={(e)=>this.drop(e)}>
            <span myDrop={id}  className="myCaret" onClick={(id) => this.setCSS(id)}>
              <div id={id}  parent={parent} value={row} className="btn btn-danger top10" onClick={(e) => this.showData(e)}>{caption}</div>
            </span>
            <ul ref={myRefArr[id]} className={this.state.liCSS} data={text}>
              {this.tree_(id, id)}
            </ul>
          </li>
        );
      } else {
        eArry.push(
          <li value={id} draggable="true" parent={parent} onDragStart={(e) => this.drag(e)}  onDragOver={(e) => this.allowDrop(e)}  onDrop={(e)=>this.drop(e)}  key={id} data1={text}><span className="myCaret"></span>
            <button ref={myRefArr[id]} id={id} parent={parent} type="button" className="btn btn-primary top10" onClick={(e) => this.showData(e)}>{caption}</button>
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
    e.stopPropagation();
    let parent= e.target.value;   
    if(e.target.hasAttribute('myDrop')){   
      parent = e.target.getAttribute('myDrop');    
     alert(parent);
     }else if(e.target.hasAttribute('lang')){
      parent =  e.target.lang;      
    }else{
      parent =  e.target.id;
      alert('id:'+parent);
    }

    let child = e.dataTransfer.getData("text");
    changeParent(parent, child).then((serverData) => {
      this.setState({ data: serverData.data })
      store.dispatch({ type: 'set', payLoad: serverData.data });
      })
      .catch(err => console.log('There was an error:' + err));
  }

  myTextChange(e){   
    let stext = myRefArr[0].current.value;//this.myRef.current.value;
   store.dispatch({ type: 'setText', text:stext,id:this.props.id});
  }

  render() {
    console.log('App: render');   
    return <div>
      <Nav />
      <div myDrop="0" style={styleLeft} onDragOver={(e) => this.allowDrop(e)}  onDrop={(e)=>this.drop(e)}>
        <ul className="myUL">
          {this.tree_(0, 0)}
        </ul>
      </div>
      <div  style={styleLeft2}><textarea ref={myRefArr[0]} id="myText" style={this.props.myTextarea} onKeyUp={(e) => this.myTextChange(e)} rows="4" cols="50"/></div>
      <RightSide/>
    </div>
  };
}

function mapStateToProps(state) {  
  return {
    myTextarea:state.reduceData.myTextarea,
    text :state.reduceData.text,
    id: state.reduceData.activeElement,
    data:state.reduceData.data,
    activeElement:state.reduceData.activeElement
  }
}

export default connect(mapStateToProps) (App);
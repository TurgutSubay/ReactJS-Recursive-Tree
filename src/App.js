import React from 'react';
import Nav from './nav.js';
import './css/App.css';
import { Data, changeParent } from './data.js';
import { store } from './index.js';
import RightSide from './rightSide';
import { connect } from 'react-redux';
import { styleLeft, styleTextAria,styleMain,styleHidden} from './globalVariables';

export let instance = null;
export var appData;
export var myRefArr = [];
let level=0;
let startTextWidth = 0;
let startLeftPanelWidth = 0;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      liCSS: 'nestedClosed',
      listLi: [],
      text: "",
      myRefArr: [],
      ii: 0,
    }
    this.divText = React.createRef();
    this.leftPanel= React.createRef();
    this.main= React.createRef();
  }
  refCreate(id) {
    myRefArr[id] = React.createRef();
  }

  componentDidMount() {
   
   let nawAriaH =  parseInt(getComputedStyle(document.getElementById('navAria'),null).height);
   this.divText.current.style.height  =  window.innerHeight - nawAriaH + 'px';
   this.leftPanel.current.style.height  =  window.innerHeight - nawAriaH + 'px';
   document.getElementById('infoPanel').style.height  =  window.innerHeight - nawAriaH + 'px';

   let infoPanelW  = parseInt(getComputedStyle(document.getElementById('infoPanel'),null).width); 
   let leftPanelW  = parseInt(getComputedStyle(document.getElementById('leftPanel'),null).width);
   let mainW  = parseInt(getComputedStyle(document.getElementById('main'),null).width);
   let divText = document.getElementById('divText');
   startTextWidth =   mainW - infoPanelW - leftPanelW ;
   startLeftPanelWidth = leftPanelW;
   this.divText.current.style.width = mainW - infoPanelW - leftPanelW + 'px';
   console.log('W: ' + divText.style.width);
    this.refCreate(0);
    Data('user').then((serverData) => {
      store.dispatch({ type: 'set', payLoad: serverData.data });
    })
      .catch(err => console.log('There was an error:' + err));
    console.log('App componentDidMount');
    appData = this.props.data;
  }

  setCSS(e) {
    let id=-1;
    if (e.target.nodeName === "SPAN") {
       id = e.target.lang;     
    }else{
     id = e.target.id;
    }
    myRefArr[id].current.classList.toggle('nestedClosed');
    myRefArr[id].current.classList.toggle('nestedShow');
    e.target.classList.toggle('myCaret-down');
    document.querySelector("[lang='" + id + "']").classList.toggle('myCaret-down');
  }

   showData  = (e, server=0, prnt=0) => {
    instance = this;
    let id =  0;
    if (server === 0){
      id = e.target.id;
    }else{
      id = e;
      this.setState({ii:id});
    }
    if (this.props.activeElement > 0) {
      if (myRefArr[this.props.activeElement].current){
        if (myRefArr[this.props.activeElement].current.nodeName === 'BUTTON') {
          myRefArr[this.props.activeElement].current.classList.add('btn-primary');
          myRefArr[this.props.activeElement].current.classList.remove('btn-success');
        }
        if (myRefArr[this.props.activeElement].current.nodeName === 'UL') {
          document.getElementById(this.props.activeElement).classList.add('btn-danger');
          document.getElementById(this.props.activeElement).classList.remove('btn-success');
        }
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
    document.querySelectorAll(".myCaretActive").forEach(item=> item.classList.remove('myCaretActive'));
    document.querySelector("[lang='" + id + "']").classList.add('myCaretActive');

    let wx = myRefArr[id].current.getAttribute('level') * 20;  // *40  padding-inline-start
    let divTextL = startLeftPanelWidth;
    this.divText.current.style.left = divTextL +  wx + 'px';
    this.divText.current.style.width =  startTextWidth - wx + 'px';
    this.leftPanel.current.style.width = startLeftPanelWidth + wx + 'px';
    
    let stext = "";
    appData.forEach(element => {
      if (element.id === id) {
        stext = element.text;
      }
    });

    let node = myRefArr[0].current;
    node.value = stext;
    let parent = -1;
    if (server === 0){
      if (e.target.hasAttribute('parent')) {
        parent = e.target.getAttribute('parent');
      }
    }else{
      parent = prnt;
    }
    console.log('showData id: '+ id+ '  parent : '+ parent, myRefArr[id].current.nodeName);
    store.dispatch({ type: 'setElement', payLoad: id, parents: parent, text: stext });
  }

  query(parentRow) {
    let arrCh = [];
    appData = this.props.data;
    for (let row1 = 0; row1 < appData.length; row1++) {
      if (Number(appData[row1].parent) === Number(parentRow)) {
        arrCh.push(row1);
      }
    }
    return arrCh;
  }

  tree_(parentRow) {
    appData = this.props.data;
    if (appData.length === 0) {
      return;
    }
    let eArry = [];
    var arry = this.query(parentRow);

    for (var row = 0; row < arry.length; row++) {
      let i = arry[row];
      let id = appData[i].id;
      let parent = appData[i].parent;
      let text = appData[i].text;
      let caption = appData[i].caption;
      this.refCreate(id);
      
      if (this.query(id).length > 0) {
        eArry.push(
          <li level={level} key={id} draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={(e) => this.allowDrop(e)} onDrop={(e) => this.drop(e)}>
            <div style={styleHidden}>{level++}</div>
            <span lang={id} className="myCaret" onClick={(id) => this.setCSS(id)}>
              <div id={id} parent={parent} value={row} className="btn btn-danger top10" onClick={(e) => this.showData(e)}>{caption}</div>
            </span>
            <ul level={level} ref={myRefArr[id]} className={this.state.liCSS} data={text}>
              {this.tree_(id)}
            </ul>
            <div style={styleHidden}>{level--}</div>
          </li>          
        );               
      } else {
        eArry.push(
          <li level={level} value={id} draggable="true" parent={parent} onDragStart={(e) => this.drag(e)} onDragOver={(e) => this.allowDrop(e)} onDrop={(e) => this.drop(e)} key={id} data1={text}><span lang={id} className="myCaret"></span>
            <button level={level} ref={myRefArr[id]} id={id} parent={parent} type="button" className="btn btn-primary top10" onClick={(e) => this.showData(e)}>{caption}</button>
          </li>);
      }
    }
    return eArry;
  }

  allowDrop(e) {
    if (e.target.nodeName === "BUTTON" || e.target.nodeName === "DIV") {
      e.preventDefault();
    } else {
      return
    }
  }

  drag(e) {
    let id = e.target.value;
    e.dataTransfer.setData("text", id);
  }

  drop(e) {
    e.preventDefault();
    e.stopPropagation();
    let parent = e.target.value;
    if (e.target.hasAttribute('myDrop')) {
      parent = e.target.getAttribute('myDrop');
      alert(parent);
    } else if (e.target.hasAttribute('lang')) {
      parent = e.target.lang;
    } else {
      parent = e.target.id;
      alert('Parent id:' + parent);
    }
    let child = e.dataTransfer.getData("text");
	alert(child);
    if (parent !== child) {
      changeParent(parent, child).then((serverData) => {
        this.setState({ data: serverData.data })
        store.dispatch({ type: 'set', payLoad: serverData.data });
      })
        .catch(err => console.log('There was an error:' + err));
    }
  }

  myTextChange(e) {
    let stext = myRefArr[0].current.value;//this.myRef.current.value;
    store.dispatch({ type: 'setText', text: stext, id: this.props.id });
  }

  mousemove(e){
    //let leftPanelW  = parseInt(getComputedStyle(document.getElementById('leftPanel'),null).width);
  }
  
  render() {
    return <div id="main" ref={this.main}  style={styleMain} onMouseMove={(e)=> this.mousemove(e)}>
      <Nav/>
      <div id="leftPanel" ref={this.leftPanel} style={styleLeft} onDragOver={(e) => this.allowDrop(e)} onDrop={(e) => this.drop(e)}>
        <ul className="myUL">
          {this.tree_(0)}
        </ul>
      </div>
      <div style={styleTextAria } id='divText' ref={this.divText}>
        <textarea ref={myRefArr[0]} id="myText" style={this.props.myTextarea} onKeyUp={(e) => this.myTextChange(e)} rows="4" cols="50" />
      </div>
      <RightSide />
    </div>
  };
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

export default connect(mapStateToProps)(App);
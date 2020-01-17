var iactiveElement = 0;

 export function setActiveElement(i){
    iactiveElement = i;
     return iactiveElement;
 }
 export function getActiveElement(){    
     return iactiveElement;
 }

export const styleLeft = {
    zIndex: 1,
    float:'left',
    position: 'absolute',
    minWidth: '200px',
    height: '90vh',
    backgroundColor: '#333',
    overflow: 'auto'
  }
export  const styleTextAria = {
    zIndex: 2,
    float:'left',
    left: '200px',    
    position: 'relative',    
   // width: '700px',
    height: '90vh',
    marginTop: '0px',
    marginLeft: '0px',
    backgroundColor: '#333',
    padding: '4px',
    cursor: 'w-resize',
    after: {
     cursor: 'w-resize',
    }  
  }

export const styleAfter ={
 
}  
export const styleHidden ={
  display:'hidden',
  margins:'0px',
  height:'0px',
  width:'0px'
}
export const styleMain ={  
  width: '100%',
  height: '100%',
}

export const infoPanel = {
  position: 'relative',
  float: 'right',
  zIndex: 1,
  left:'00px',  
  width: '200px',
  height:'90vh',
  marginTop: '0px',
  marginLeft: '0px',
  backgroundColor:'#333',
  padding:'10px',
  color:'#ccc'
}

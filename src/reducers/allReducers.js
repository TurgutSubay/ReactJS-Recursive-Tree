import  {combineReducers} from 'redux';

let init= {
   data:[],
   activeElement:0,
   text:'',
   log:false
}
   
const dataR = (state=init,action) => {    
    const newState = {...state};

    switch(action.type){
        case 'set':  state.data = action.payLoad;  return newState;
        case 'get': return newState;
        case 'setElement':  const newS = {
            ...newState,
            activeElement :action.payLoad,
            text : action.text
        } 
        return newS;
        default: return  newState;        
    }
}

export const set_data = (nr) => {
    return {
        type: 'set',
        payLoad: nr
    }
}

export const set_activeElement = (nr,text) => {
    return {
        type: 'setElement',
        payLoad: nr,
        text:text
    }
}


export const allReducers = combineReducers({
    reduceData:dataR
})
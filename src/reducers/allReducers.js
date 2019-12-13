import  {combineReducers} from 'redux';

let init= {
   data:[],
   parents:-1,
   activeElement:-1,
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
            parents : action.parents,
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

export const set_activeElement = (nr,text,parent) => {
    return {
        type: 'setElement',
        payLoad: nr,
        parent: parent,    
        text:text
    }
}


export const allReducers = combineReducers({
    reduceData:dataR
})
import  {combineReducers} from 'redux';

let init= {
   data:[],
   log:false
}
   
const dataR = (state=init,action) => {    
    switch(action.type){
        case 'set':  state.data = action.payLoad;  return state 
        case 'get': return state;
        default: return  state;        
    }
}

export const set_data = (nr) => {
    return {
        type: 'set',
        payLoad: nr
    }
}

export const allReducers = combineReducers({
    reduceData:dataR
})
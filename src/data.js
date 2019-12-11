export function Data(){  
    return new Promise(function(resolve, reject){        
        fetch('http://localhost/react/reactjs-recursive-tree/public/server/conn.php',
        {
              method: "GET",
              cache: 'no-cache',               
              credentials: 'same-origin', 
              redirect: 'follow', 
              referrer: 'no-referrer', 
              mode: 'cors',                    
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'               
              },            
        })
        .then(response => response.json())
        .then(response=> {            
            resolve(response);        
            console.log(response );
          })
        .catch(xx =>{           
            console.log(xx);
          });
      });
}

export function changeParent(parent, child){
  return new Promise(function(resolve, reject){        
    fetch('http://localhost/react/reactjs-recursive-tree/public/server/changeParent.php?parent='+parent+'&child='+child,
    {
          method: "GET",
          cache: 'no-cache',               
          credentials: 'same-origin', 
          redirect: 'follow', 
          referrer: 'no-referrer', 
          mode: 'cors',                    
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'               
          },   
         // body:  'parent='+ parent + '&child=' +  child           
    })
    .then(response => response.json())
    .then(response=> {            
        resolve(response);        
        console.log(response );
      })
    .catch(xx =>{           
        console.log(xx);
      });
  });
}
export function addChild(parent, text,caption){
  return new Promise(function(resolve, reject){        
    fetch('http://localhost/react/reactjs-recursive-tree/public/server/addChild.php?parent='+parent+'&text='+text+'&caption='+caption,
    {
          method: "GET",
          cache: 'no-cache',               
          credentials: 'same-origin', 
          redirect: 'follow', 
          referrer: 'no-referrer', 
          mode: 'cors',                    
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'               
          }         
    })
    .then(response => response.json())
    .then(response=> {            
        resolve(response);        
        console.log(response );
      })
    .catch(xx =>{           
        console.log(xx);
      });
  });
}
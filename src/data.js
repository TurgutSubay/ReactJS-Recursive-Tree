export function Data(){  
    return new Promise(function(resolve, reject){        
        fetch('http://localhost/react/reactjs-recursive-tree/public/server/conn.php',
        //fetch('http://localhost/react/server/conn.php',
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
            //console.log('Data response:'+JSON.stringify(response));            
          })
        .catch(xx =>{           
            console.log(JSON.stringify(xx));
          });
      });
}

export function changeParent(parent, child){
  return new Promise(function(resolve, reject){        
    fetch('http://localhost/react/reactjs-recursive-tree/public/server/changeParent.php',
    //fetch('http://localhost/react/server/changeParent.php',
    {
          method: "POST",
          cache: 'no-cache',               
          credentials: 'same-origin', 
          redirect: 'follow', 
          referrer: 'no-referrer', 
          mode: 'cors',                    
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'               
          },   
          body:  JSON.stringify({"parent": parent , "child" :  child})
		 
    })
    .then(response => response.json())
    .then(response=> {            
        resolve(response);        
        console.log('changeParent:'+response );
      })
    .catch(xx =>{           
        console.log(JSON.stringify(xx));
      });
  });
}

export function updateRatingScore(id, ratingScore){
  return new Promise(function(resolve, reject){        
    fetch('http://localhost/react/reactjs-recursive-tree/public/server/updateRatingScore.php',
    {
          method: "POST",
          cache: 'no-cache',               
          credentials: 'same-origin', 
          redirect: 'follow', 
          referrer: 'no-referrer', 
          mode: 'cors',                    
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'               
          },   
          body:  JSON.stringify({"id": id , "ratingScore" :  ratingScore})
		 
    })
    .then(response => response.json())
    .then(response=> {            
        resolve(response);        
        console.log('changeParent:'+response );
      })
    .catch(xx =>{           
        console.log(JSON.stringify(xx));
      });
  });
}


export function addChild(parent, text,caption){
  console.log(parent+ text+ caption);
  return new Promise(function(resolve, reject){        
    fetch('http://localhost/react/reactjs-recursive-tree/public/server/addChild.php',
    //fetch('http://localhost/react/server/addChild.php?parent='+parent+'&text='+text+'&caption='+caption,
    {
          method: "POST",
          cache: 'no-cache',               
          credentials: 'same-origin', 
          redirect: 'follow', 
          referrer: 'no-referrer', 
          mode: 'cors',                    
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'               
          },
          body:  JSON.stringify({"parent":parent,"text":text,"caption": caption})          
    })
    .then(response => response.json())
    .then(response=> {            
        resolve(response);        
        console.log('addChild:'+JSON.stringify(response));
      })
    .catch(xx =>{             
        console.log('RES: '+JSON.stringify(xx));
      });
  });
}

export function updataTextData(id, text){
  return new Promise(function(resolve, reject){        
   fetch('http://localhost/react/reactjs-recursive-tree/public/server/updateText.php',
   //fetch('http://localhost/react/server/updateText.php',
   {
          method: "POST",
          cache: 'no-cache',               
          credentials: 'same-origin', 
          redirect: 'follow', 
          referrer: 'no-referrer', 
          mode: 'cors',                    
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'               
          },   
          body:  JSON.stringify({"id":id,"text":text})
    })
    .then(response => response.json())
    .then(response=> {            
        resolve(response);
        alert("Server updated");    
        console.log('updataTextData:'+JSON.stringify(response));
      })
    .catch(xx =>{           
        console.log(JSON.stringify(xx));
      });
  });
}

export function deleteData(id){
  return new Promise(function(resolve, reject){        
    fetch('http://localhost/react/reactjs-recursive-tree/public/server/delete.php?id='+id,
    //fetch('http://localhost/react/server/delete.php?id='+id,
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
        console.log('deleteData:'+response );
      })
    .catch(xx =>{           
        console.log(JSON.stringify(xx));
      });
  });
}
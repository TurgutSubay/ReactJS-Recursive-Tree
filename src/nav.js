import React from 'react';

const addCSS={
  'backgroundColor' : '#ccc' 
}

function Nav() {
  return (   
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={addCSS}>
     <a className="navbar-brand" href="index.html">Sample codes</a>
    </nav> 
  );
}

export default Nav;

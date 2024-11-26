import React from 'react';

const Breadcrumb = () => {
  return (
    <div id="breadcrumb" className="section">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-md-12">
            <ul className="breadcrumb-tree">
              <li><a href="#">Home</a></li>
              <li><a href="#">All Categories</a></li>
              <li><a href="#">Accessories</a></li>
              <li className="active">Headphones (227,490 Results)</li>
            </ul>
          </div>
        </div>
        {/* /row */}
      </div>
      {/* /container */}
    </div>
    // /BREADCRUMB
  );
}

export default Breadcrumb;

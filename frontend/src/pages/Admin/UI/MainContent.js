import React from 'react';

function MainContent({ children }) {
  return (
    <div className="content">
      {/* Navbar */}
      <nav>
        <i className='bx bx-menu'></i>
        <form action="#">
          <div className="form-input">
            <input type="search" placeholder="Search..." />
            <button className="search-btn" type="submit">
              <i className='bx bx-search'></i>
            </button>
          </div>
        </form>
        <a href="/abc" className="profile">
          <img src="https://png.pngtree.com/png-clipart/20230207/original/pngtree-beauty-logo-design-png-image_8947095.png" alt="Profile" />
        </a>
      </nav>
      {/* End of Navbar */}

      <main>
        <div className="header">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <li>Store</li>
            </ul>
          </div>
        </div>

        {/* Hiển thị nội dung con ở đây */}
        {children} 
      </main>
    </div>
  );
}

export default MainContent;

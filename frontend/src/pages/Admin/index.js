import React from 'react';
import Sidebar from './UI/Sidebar';
import MainContent from './UI/MainContent';
import './UI/index.css'


function Admin({ children }) {
  return (
    <div>
      <Sidebar />
      <MainContent>
        <div className="admin-content">
          {children} {/* Hiển thị nội dung bên trong Admin */}
        </div>
      </MainContent>
    </div>
  );
}


export default Admin;
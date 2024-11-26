import React, { useState,useEffect  } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); // Lấy thông tin vị trí hiện tại
  const [activeIndex, setActiveIndex] = useState(0); // Quản lý trạng thái active

  const menuItems = [
    { name: 'Statistical', icon: 'bx bx-bar-chart', path: '/statistical' },
    // { name: 'Song', icon: 'bx bxs-music', path: '/admin/song' },
    { name: 'Product', icon: 'bx bx-box', path: '/admin/product' }, 
    { name: 'Category', icon: 'bx bx-category', path: '/admin/category' },
    { name: 'Discount', icon: 'bx bx-purchase-tag', path: '/admin/discount' }, 
    { name: 'Users', icon: 'bx bx-group', path: '/admin/user' },
  ];

  // Cập nhật trạng thái active dựa trên đường dẫn hiện tại
  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = menuItems.findIndex(item => item.path === currentPath);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Không thêm 'menuItems' vì nó không thay đổi

  return (
    <div className="sidebar">
      <ul className="side-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            <Link to={item.path}>
              <i className={item.icon}></i>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu">
        <li>
          <Link to="/logout" className="logout">
            <i className='bx bx-log-out-circle'></i>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes'; 
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}

          {/* Private Routes */}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route 
                key={index} 
                path={route.path} 
                element={
                  <PrivateRoute>
                    <Page />
                  </PrivateRoute>
                } 
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Dashboard from '../features/Admin/DashboardAdmin';
import AdminLayout from '../layouts/AdminLayouts';
import LoginPage from '../features/auth/LoginPage';
import AdminWelcome from '../features/Admin/AdminWelcom';
import NotFound from '../Pages/NotFound';
import Collabs from '../features/Admin/CollaborateursAdmin';
import Historique from '../features/Admin/HistoriquePointages';
import ResetPasswordPage from '../features/auth/ResetPasswordPage';



const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin/dashboard" element={<AdminLayout> <Dashboard /></AdminLayout>} />
        <Route path='/adminlayouts' element = {<AdminLayout>
            <AdminWelcome/>
        </AdminLayout>}/>
        <Route path='/admin/Collaborateurs' element ={<AdminLayout> <Collabs/></AdminLayout>}/>
        <Route path='/admin/HistoriquePointages' element = {<AdminLayout> <Historique/></AdminLayout>}/>
        <Route path='/Login' element = {<LoginPage/>}/>
        <Route path='*' element = {<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

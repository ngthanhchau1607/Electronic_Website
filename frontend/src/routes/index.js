
import AdminUser from '../pages/Admin/AdminUser/AdminUser';
import AdminSong from '../pages/Admin/AdminSong/AdminSong';
import AdminCategory from '../pages/Admin/AdminCategory/AdminCategory';
import AdminProduct from '../pages/Admin/AdminProduct/AdminProduct';
import Main from '../components/Main/main'
import Store from '../components/Store/store'


const publicRoutes = [
    {path:'/admin/user' ,component: AdminUser},  
    {path:'/admin/category' ,component: AdminCategory},
    {path:'/admin/product' ,component: AdminProduct},
    {path:'/admin/song' ,component: AdminSong},

    {path:'/' ,component: Main},
    {path:'/store' ,component: Store},



]

const privateRoutes = [
      
]


export {publicRoutes , privateRoutes}
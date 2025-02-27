import Login from '~/pages/client/Login/Login';
import Home from '../pages/client/Home/Home';
import Register from '~/pages/client/Register/Register';
import WishList from '~/pages/client/WishList/WishList';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/wishlist', component: WishList },
];

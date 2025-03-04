import Login from '~/pages/client/Login/Login';
import Home from '../pages/client/Home/Home';
import Register from '~/pages/client/Register/Register';
import WishList from '~/pages/client/WishList/WishList';
import Cart from '~/pages/client/Cart/Cart';
import Page404 from '~/components/Page404/Page404';
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout';
import DetailProduct from '~/pages/client/DetailProduct/DetailProduct';

export const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/login', component: Login, layout: DefaultLayout },
    { path: '/register', component: Register, layout: DefaultLayout },
    { path: '/wishlist', component: WishList, layout: DefaultLayout },
    { path: '/cart', component: Cart, layout: DefaultLayout },
    { path: '/product/:id', component: DetailProduct, layout: DefaultLayout },
    { path: '/*', component: Page404, layout: null },
];

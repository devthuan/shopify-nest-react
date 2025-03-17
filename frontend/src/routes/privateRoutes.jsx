import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout';
import Cart from '~/pages/client/Cart/Cart';

export const privateRoutes = [{ path: '/cart', component: Cart, layout: DefaultLayout }];

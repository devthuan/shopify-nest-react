import Page404 from '~/components/Page404/Page404';
import DashboardLayout from '~/layouts/DashboardLayout/DashboardLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import Order from '~/pages/admin/Order/Order';

export const adminRoutes = [
    { path: '/dashboard', component: Dashboard, layout: DashboardLayout },
    { path: '/manage-product', component: Dashboard, layout: DashboardLayout },
    { path: '/orders', component: Order, layout: DashboardLayout },
    { path: '/*', component: Page404, layout: null },
];

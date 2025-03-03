import Page404 from '~/components/Page404/Page404';
import Home from '../pages/admin/Home/Home';
import DashboardLayout from '~/layouts/DashboardLayout/DashboardLayout';

export const adminRoutes = [
    { path: '/dashboard', component: Home, layout: DashboardLayout },
    { path: '/manage-product', component: Home, layout: DashboardLayout },
    { path: '/*', component: Page404, layout: null },
];

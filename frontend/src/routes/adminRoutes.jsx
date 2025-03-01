import Page404 from '~/components/Page404/Page404';
import DashboardLayout from '~/layouts/DashboardLayout/DashboardLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';

export const adminRoutes = [
    { path: '/dashboard', component: Dashboard, layout: DashboardLayout },
    { path: '/manage-product', component: Dashboard, layout: DashboardLayout },
    { path: '/*', component: Page404, layout: null },
];

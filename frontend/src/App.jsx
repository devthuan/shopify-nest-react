import { BrowserRouter, Route, Routes } from 'react-router';
import { publicRoutes } from './routes/publicRoutes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout.jsx';
import { Fragment } from 'react';
import { adminRoutes } from './routes/adminRoutes';
import RouteWrapper from './routes/RouteWrapper';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* initial public routes */}
                    {publicRoutes.map((route, i) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={i}
                                path={route.path}
                                element={<RouteWrapper layout={Layout} component={Page} />}
                            />
                        );
                    })}

                    {/* routes for admin */}
                    {adminRoutes.map((route, i) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={i}
                                path={route.path}
                                element={<RouteWrapper layout={Layout} component={Page} />}
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

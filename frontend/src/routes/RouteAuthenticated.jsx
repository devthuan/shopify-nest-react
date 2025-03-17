import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Loading from '~/components/Loading/Loading';
import { getItemWithExpiration } from '~/services/localStorage';

const RouteAuthenticated = ({ component: Component, layout: Layout }) => {
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const token = getItemWithExpiration('accessToken');
        console.log('Token:', token);
        if (token) {
            dispatch(setAccessToken(token));
        } else {
            navigate('/not-found', { replace: true });
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [params]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white">
                <Loading />
            </div>
        );
    }

    return Layout ? (
        <Layout>
            <Component />
        </Layout>
    ) : (
        <Component />
    );
};

export default RouteAuthenticated;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Loading from '~/components/Loading/Loading';
import { setAccessToken } from '~/redux/features/user/userSlice';
import { getItemWithExpiration } from '~/services/localStorage';

const RouteWrapper = ({ component: Component, layout: Layout }) => {
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const token = getItemWithExpiration('accessToken');
        if (token) {
            dispatch(setAccessToken(token));
        } else {
            // navigate('/login');
        }
    }, [dispatch]);

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

export default RouteWrapper;

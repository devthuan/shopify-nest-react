import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Loading from '~/components/Loading/Loading';

const RouteWrapper = ({ component: Component, layout: Layout }) => {
    const [loading, setLoading] = useState(true);
    const params = useParams();
    console.log(params);

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

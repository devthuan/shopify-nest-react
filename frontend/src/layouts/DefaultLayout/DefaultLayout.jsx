import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import TopHeader from '~/layouts/components/TopHeader/TopHeader';
import Header from '~/layouts/components/Header/Header';
import Footer from '~/layouts/components/Footer/Footer';
import Line from '~/components/LIne/Line';
const cx = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
    return (
        <>
            <TopHeader />
            <Header />
            <div style={{ position: 'relative' }}>
                <Line />
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>{children}</div>
                <Footer />
            </div>
        </>
    );
};

export default DefaultLayout;

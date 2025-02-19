import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import TopHeader from '~/layouts/components/TopHeader/TopHeader';
import Header from '~/layouts/components/Header/Header';
import Footer from '~/layouts/components/Footer/Footer';
const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <TopHeader />
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Category from '~/components/Category/Category';
import TopBanner from '~/components/TopBanner/TopBanner';
import images from '~/assets/images';
const cx = classNames.bind(styles);

const slides = [images.anh1, images.anh2, images.anh3];
const Home = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top-content')}>
                    <Category />
                    <div className={cx('top-banner')}>
                        <TopBanner slides={slides} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

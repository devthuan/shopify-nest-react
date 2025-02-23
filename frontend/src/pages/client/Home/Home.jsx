import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Category from '~/components/Category/Category';
import TopBanner from '~/components/TopBanner/TopBanner';
import images from '~/assets/images';
import TrendingProducts from '~/components/TrendingProducts/TrendingProducts';
import Button from '~/components/Button/Button';
import Line from '~/components/Line/Line';
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
                <TrendingProducts
                    topTitle={"Today's"}
                    heading={'Flash Sales'}
                    haveTimer
                    haveChangePage
                    rowQuantity={1}
                />
                <div className={cx('centerInside')}>
                    <Button
                        width={'234px'}
                        height={'56px'}
                        marginBottom={'60px'}
                        marginTop={'60px'}
                        text={'View All Products'}
                    />
                </div>
                <Line />
                <TrendingProducts
                    topTitle={'Categories'}
                    heading={'Browse By Category'}
                    haveChangePage
                    isCateGory
                    rowBrowseCategoryQuantity={1}
                    className="mb-[70px] mt-[80px]"
                />
                <Line />
                <TrendingProducts
                    topTitle={'This Month'}
                    heading={'Best Selling Products'}
                    haveChangePage
                    rowQuantity={1}
                    className="mb-[140px] pt-[80px]"
                />
            </div>
        </div>
    );
};

export default Home;

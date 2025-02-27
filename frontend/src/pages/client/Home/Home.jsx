import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Category from '~/components/Category/Category';
import TopBanner from '~/components/TopBanner/TopBanner';
import images from '~/assets/images';
import TrendingProducts from '~/components/TrendingProducts/TrendingProducts';
import Button from '~/components/Button/Button';
import Line from '~/components/Line/Line';
import TimerEllipse from '~/components/TimerEllipse/TimerEllipse';
import FullServices from '~/components/FullServices/FullServices';
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
                    <Button primary className="mt-[60px] mb-[60px]">
                        View All Products
                    </Button>
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
                    rowQuantity={1}
                    haveViewAll={'View All'}
                    className="mb-[140px] pt-[80px]"
                />

                <div className={cx('hot-banner')}>
                    <div className={cx('left')}>
                        <span className={cx('top-title')}>Categories</span>
                        <span className={cx('title')}>Enhance Your Music Experience</span>
                        <TimerEllipse className={cx('timer-ellipse')} />
                        <Button green className="mt-[40px] ml-[56px]">
                            Buy Now!
                        </Button>
                    </div>
                    <div className={cx('light-behind')}>
                        <img src={images.productHotBanner} alt="product-hot-banner" />
                    </div>
                </div>

                <TrendingProducts
                    topTitle={'Our Products'}
                    heading={'Explore Our Products'}
                    haveChangePage
                    rowQuantity={2}
                />

                <div className={cx('centerInside')}>
                    <Button primary className="mt-[60px] mb-[140px]">
                        View All Products
                    </Button>
                </div>

                <TrendingProducts topTitle={'Featured'} heading={'New Arrival'} isNewArrival className="mb-[140px]" />
                <FullServices className="mb-[140px]" />
            </div>
        </div>
    );
};

export default Home;

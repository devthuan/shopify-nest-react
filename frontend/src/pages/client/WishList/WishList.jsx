import classNames from 'classnames/bind';
import styles from './WishList.module.scss';
import TrendingProducts from '~/components/TrendingProducts/TrendingProducts';

const cx = classNames.bind(styles);

const WishList = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <TrendingProducts
                    topTitle={'This Month'}
                    heading={'Best Selling Products'}
                    rowQuantity={1}
                    isInWishList
                    buttonNameInWishList={'Move All To Bag'}
                    className="mb-[80px] pt-[40px]"
                />

                <TrendingProducts
                    topTitle={'This Month'}
                    heading={'Best Selling Products'}
                    rowQuantity={1}
                    isInWishList
                    buttonNameInWishList={'See All'}
                    isForYou={'Just For You'}
                    className="mb-[140px]"
                />
            </div>
        </div>
    );
};

export default WishList;

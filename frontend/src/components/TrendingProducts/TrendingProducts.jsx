import classNames from 'classnames/bind';
import styles from './TrendingProducts.module.scss';
import { RectangleIcon } from '~/components/Icons';
import Timer from '../Timer/Timer';
import ListProduct from '../ListProduct/ListProduct';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const TrendingProducts = ({
    className,
    topTitle,
    heading,
    haveTimer,
    haveChangePage,
    haveViewAll,
    rowQuantity,
    isCateGory,
    rowBrowseCategoryQuantity,
    isNewArrival,
}) => {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('left')}>
                        <div className={cx('title')}>
                            <div className={cx('top')}>
                                <RectangleIcon />
                                <span>{topTitle}</span>
                            </div>
                            <span className={cx('title-detail')}>{heading}</span>
                        </div>
                        <div className={cx('timer')}>{haveTimer && <Timer />}</div>
                    </div>
                </div>

                {!isNewArrival ? (
                    <ListProduct
                        haveChangePage={haveChangePage}
                        haveViewAll={haveViewAll}
                        rowQuantity={rowQuantity}
                        isCateGory={isCateGory}
                        rowBrowseCategoryQuantity={rowBrowseCategoryQuantity}
                    />
                ) : (
                    <div className={cx('new-arrival-wrapper')}>
                        <div className={cx('new-arrival-left-wrapper')}>
                            <div className={cx('img-570x600', 'relative')}>
                                <img src={images.img570x600} />
                                <div className={cx('new-arrival-content')}>
                                    <div className={cx('heading')}>PlayStation 5</div>
                                    <div className={cx('description')}>
                                        Black and White version of the PS5 coming out on sale.
                                    </div>
                                    <a href="#" className={cx('btn-shop')}>
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={cx('new-arrival-right-wrapper')}>
                            <div className={cx('img-570x284', 'relative')}>
                                <img src={images.img570x284} />
                                <div className={cx('new-arrival-content')}>
                                    <div className={cx('heading')}>Women’s Collections</div>
                                    <div className={cx('description')}>
                                        Featured woman collections that give you another vibe.
                                    </div>
                                    <a href="#" className={cx('btn-shop')}>
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                            <div className={cx('new-arrival-right-bottom-wrapper')}>
                                <div className={cx('img-270x284', 'relative')}>
                                    <img src={images.img270x284} />
                                    <div className={cx('new-arrival-content')}>
                                        <div className={cx('heading')}>Speakers</div>
                                        <div className={cx('description')}>Amazon wireless speakers</div>
                                        <a href="#" className={cx('btn-shop')}>
                                            Shop Now
                                        </a>
                                    </div>
                                </div>

                                <div className={cx('img-270x284', 'relative')}>
                                    <img src={images.img270x284} />
                                    <div className={cx('new-arrival-content')}>
                                        <div className={cx('heading')}>Perfume</div>
                                        <div className={cx('description')}>GUCCI INTENSE OUD EDP</div>
                                        <a href="#" className={cx('btn-shop')}>
                                            Shop Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingProducts;

import classNames from 'classnames/bind';
import styles from './TrendingProducts.module.scss';
import { RectangleIcon } from '~/components/Icons';
import Timer from '../Timer/Timer';
import ListProduct from '../ListProduct/ListProduct';

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

                <ListProduct
                    haveChangePage={haveChangePage}
                    haveViewAll={haveViewAll}
                    rowQuantity={rowQuantity}
                    isCateGory={isCateGory}
                    rowBrowseCategoryQuantity={rowBrowseCategoryQuantity}
                />
            </div>
        </div>
    );
};

export default TrendingProducts;

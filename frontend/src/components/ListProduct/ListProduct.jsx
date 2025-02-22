import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';
import Product from './Product/Product';
import { ArrowLeftIcon, ArrowRightIcon, EllipseProductIcon } from '../Icons';
const cx = classNames.bind(styles);

const ListProduct = ({ haveChangePage, haveViewAll }) => {
    return (
        <div className={cx('wrapper')}>
            {haveViewAll && (
                <div className={cx('view-all')}>
                    <button>View All</button>
                </div>
            )}
            {haveChangePage && (
                <div className={cx('change-wrapper')}>
                    <div className={cx('change-prev')}>
                        <EllipseProductIcon
                            fill={'#f5f5f5'}
                            className={cx('ellipse-icon')}
                            width="4.6rem"
                            height="4.6rem"
                        />
                        <ArrowLeftIcon className={cx('arrow-icon')} />
                    </div>

                    <div className={cx('change-next')}>
                        <EllipseProductIcon
                            fill={'#f5f5f5'}
                            className={cx('ellipse-icon')}
                            width="4.6rem"
                            height="4.6rem"
                        />
                        <ArrowRightIcon className={cx('arrow-icon')} />
                    </div>
                </div>
            )}
            <div className={cx('container')}>
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
    );
};

export default ListProduct;

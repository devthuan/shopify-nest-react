import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import {
    EllipseProductIcon,
    EyeProductIcon,
    HeartProductIcon,
    StarFullProductIcon,
    TrashProductIcon,
} from '~/components/Icons';
import Button from '~/components/Button/Button';
const cx = classNames.bind(styles);

const Product = ({ sale, image, name, priceFinal, pricePre, isInWishList, isForYou }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <img className={cx('image')} src={image} />
                    <span className={cx('sale')}>{sale}</span>
                    <div className={cx('intergrate-icon')}>
                        {isInWishList ? (
                            <>
                                {isForYou ? (
                                    <span className={cx('eye')}>
                                        <EllipseProductIcon fill={'#fff'} className={cx('ellipse-icon')} />
                                        <EyeProductIcon className={cx('eye-icon')} />
                                    </span>
                                ) : (
                                    <span className={cx('trash')}>
                                        <EllipseProductIcon fill={'#fff'} className={cx('ellipse-icon')} />
                                        <TrashProductIcon className={cx('trash-icon')} />
                                    </span>
                                )}
                            </>
                        ) : (
                            <>
                                <span className={cx('heart')}>
                                    <EllipseProductIcon fill={'#fff'} className={cx('ellipse-icon')} />
                                    <HeartProductIcon className={cx('heart-icon')} />
                                </span>
                            </>
                        )}
                    </div>
                    <Button small className={cx('add-to-cart-btn')} widthFull>
                        Add to cart
                    </Button>
                </div>
                <div className={cx('bottom')}>
                    <div className={cx('name')}>{name}</div>
                    <div className={cx('price')}>
                        <span className={cx('price-final')}>{priceFinal}</span>
                        <span className={cx('price-pre')}>{pricePre}</span>
                    </div>
                    <div className={cx('evaluation')}>
                        <div className={cx('star-wrapper')}>
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                        </div>
                        <span>{'(88)'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;

import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { EllipseProductIcon, EyeProductIcon, HeartProductIcon, StarFullProductIcon } from '~/components/Icons';
const cx = classNames.bind(styles);

const Product = ({ sale, image, name, priceFinal, pricePre }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <img className={cx('image')} src={image} />
                    <span className={cx('sale')}>{sale}</span>
                    <span className={cx('heart')}>
                        <EllipseProductIcon fill={'#fff'} className={cx('ellipse-icon')} />
                        <HeartProductIcon className={cx('heart-icon')} />
                    </span>
                    <span className={cx('eye')}>
                        <EllipseProductIcon fill={'#fff'} className={cx('ellipse-icon')} />
                        <EyeProductIcon className={cx('eye-icon')} />
                    </span>
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

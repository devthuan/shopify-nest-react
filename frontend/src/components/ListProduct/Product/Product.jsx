import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import images from '~/assets/images';
import { EllipseProductIcon, EyeProductIcon, HeartProductIcon, StarFullProductIcon } from '~/components/Icons';
const cx = classNames.bind(styles);

const Product = ({ slides }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <img className={cx('image')} src={images.anhSanPham} />
                    <span className={cx('sale')}>-40%</span>
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
                    <div className={cx('name')}>HAVIT HV-G92 Gamepad</div>
                    <div className={cx('price')}>
                        <span className={cx('price-final')}>$120</span>
                        <span className={cx('price-pre')}>$160</span>
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

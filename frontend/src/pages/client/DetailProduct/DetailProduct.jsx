import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import images from '~/assets/images';
import {
    DeliveryIcon,
    EllipseIcon,
    HeartIcon,
    MinusIcon,
    PlusIcon,
    ReturnIcon,
    StarFullProductIcon,
} from '~/components/Icons';
import Line from '~/components/Line/Line';
import Button from '~/components/Button/Button';
import TrendingProducts from '~/components/TrendingProducts/TrendingProducts';
import { useParams } from 'react-router';

const cx = classNames.bind(styles);

const DetailProduct = () => {
    const { id } = useParams();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* todo: tao component road-map */}
                <div className={cx('road-map', 'mt-[80px] mb-[80px]')}></div>
                <div className={cx('content')}>
                    <div className={cx('left-images')}>
                        <div className={cx('images-select')}>
                            <div className={cx('image-select')}>
                                <img src={images.detailProductImageSelect1} alt="image" />
                            </div>
                            <div className={cx('image-select')}>
                                <img src={images.detailProductImageSelect2} alt="image" />
                            </div>
                            <div className={cx('image-select')}>
                                <img src={images.detailProductImageSelect1} alt="image" />
                            </div>
                            <div className={cx('image-select')}>
                                <img src={images.detailProductImageSelect2} alt="image" />
                            </div>
                        </div>
                        <div className={cx('image-view')}>
                            <img src={images.detailProductImageSelect1} alt="image" />
                        </div>
                    </div>
                    <div className={cx('right-description', 'relative')}>
                        <div className={cx('name')}>Havic HV G-92 Gamepad</div>
                        <div className={cx('rate', 'mt-[16px]')}>
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                        </div>
                        <div className={cx('price', 'mt-[16px]')}>$192.00</div>
                        <div className={cx('description', 'mt-[24px] mb-[24px]')}>
                            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble
                            free install & mess free removal Pressure sensitive.
                        </div>
                        <div className="relative">
                            <Line />
                        </div>
                        <div className={cx('color', 'pt-[24px]')}>
                            <span>Colours:</span>
                            <span className={cx('colors-picker')}>
                                <EllipseIcon
                                    className={cx('color-picker-item', 'selected')}
                                    width="2rem"
                                    height="2rem"
                                    fill="red"
                                />
                                <EllipseIcon
                                    className={cx('color-picker-item')}
                                    width="2rem"
                                    height="2rem"
                                    fill="pink"
                                />
                                <EllipseIcon
                                    className={cx('color-picker-item')}
                                    width="2rem"
                                    height="2rem"
                                    fill="blue"
                                />
                            </span>
                        </div>
                        <div className={cx('size', 'mt-[24px]')}>
                            <span>Size: </span>
                            <span className={cx('sizes-picker')}>
                                <div className={cx('size-picker-item')}>XS</div>
                                <div className={cx('size-picker-item')}>S</div>
                                <div className={cx('size-picker-item')}>M</div>
                                <div className={cx('size-picker-item')}>L</div>
                                <div className={cx('size-picker-item')}>XL</div>
                            </span>
                        </div>
                        <div className={cx('footer', 'mt-[24px] mb-[40px]')}>
                            <div className={cx('quantity-interaction')}>
                                <span className={cx('decrease')}>
                                    <MinusIcon />
                                </span>
                                <span className={cx('quantity')}>2</span>
                                <span className={cx('increase')}>
                                    <PlusIcon />
                                </span>
                            </div>
                            <Button primary small className={cx('btn-buy')}>
                                Buy Now
                            </Button>
                            <div className={cx('add-to-wishlist')}>
                                <HeartIcon />
                            </div>
                        </div>
                        <div className={cx('delivery-method')}>
                            <div className={cx('item')}>
                                <div className={cx('left')}>
                                    <DeliveryIcon />
                                </div>
                                <div className={cx('right')}>
                                    <span>Free Delivery</span>
                                    <a href="#">Enter your postal code for Delivery Availability</a>
                                </div>
                            </div>

                            <div className={cx('item')}>
                                <div className={cx('left')}>
                                    <ReturnIcon />
                                </div>
                                <div className={cx('right')}>
                                    <span>Return Delivery</span>
                                    <span>
                                        Free 30 Days Delivery Returns. <a href="#">Details</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TrendingProducts
                    topTitle={"Today's"}
                    heading={'Flash Sales'}
                    rowQuantity={1}
                    className="mb-[140px] mt-[140px]"
                />
            </div>
        </div>
    );
};

export default DetailProduct;

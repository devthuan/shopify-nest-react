import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import CartTable from './CartTable/CartTable';
import Button from '~/components/Button/Button';
import Line from '~/components/Line/Line';

const cx = classNames.bind(styles);

const Cart = () => {
    const heading = ['Product', 'Price', 'Quantity', 'Subtotal'];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'mt-[80px] mb-[140px]')}>
                {/* todo: tao component road-map */}
                <div className={cx('road-map')}>Hehe</div>
                <CartTable className="mb-[80px]" />
                <div className={cx('footer')}>
                    <div className={cx('left')}>
                        <input placeholder="Coupon Code" />
                        <Button primary>Apply Coupon</Button>
                    </div>
                    <div className={cx('right')}>
                        <span className={cx('right-heading', 'mb-[140px]')}>Cart Total</span>
                        <div className={cx('right-body')}>
                            <div className={cx('body-row')}>
                                <span>Subtotal:</span>
                                <span>$1750</span>
                            </div>
                            <div className="relative mt-[16px] mb-[16px]">
                                <Line />
                            </div>
                            <div className={cx('body-row')}>
                                <span>Shipping:</span>
                                <span>Free</span>
                            </div>
                            <div className="relative mt-[16px] mb-[16px]">
                                <Line />
                            </div>
                            <div className={cx('body-row')}>
                                <span>Total:</span>
                                <span>$1750</span>
                            </div>
                            <div className="relative mt-[16px] mb-[16px]">
                                <Line />
                            </div>
                        </div>
                        <Button primary className="text-center">
                            Procees to checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

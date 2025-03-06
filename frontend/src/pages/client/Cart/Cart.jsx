import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import CartTable from './CartTable/CartTable';
import Button from '~/components/Button/Button';
import Line from '~/components/Line/Line';
import { useEffect, useState } from 'react';
import { getProductsInCartWithLimitAndPage } from '~/services/cartApi';
import { getVouchersLimitAndPage } from '~/services/voucherApi';

const cx = classNames.bind(styles);

const Cart = () => {
    const [cart, setCart] = useState({});
    const [listCart, setListCart] = useState([]);
    const [voucher, setVoucher] = useState('');

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        fetchVoucher();
    }, []);

    const fetchCart = async () => {
        const res = await getProductsInCartWithLimitAndPage();
        setCart(res);
        setListCart(res.data);
    };

    const fetchVoucher = async () => {
        const res = await getVouchersLimitAndPage();
    };

    const getSubtotal = () => {
        let subtotal = 0;
        listCart.forEach((item) => {
            subtotal += item.quantity * item.variants.price;
        });
        return subtotal;
    };

    console.log(listCart);

    const handleCheckOutCart = () => {};
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'mt-[80px] mb-[140px]')}>
                {/* todo: tao component road-map */}
                <div className={cx('road-map')}>Hehe</div>
                <CartTable className="mb-[80px]" listCart={listCart} setListCart={setListCart} />
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
                                <span>${getSubtotal()}</span>
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
                                <span>${getSubtotal()}</span>
                            </div>
                            <div className="relative mt-[16px] mb-[16px]">
                                <Line />
                            </div>
                        </div>
                        <Button primary className="text-center" onClick={() => handleCheckOutCart()}>
                            Procees to checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

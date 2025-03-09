import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import CartTable from './CartTable/CartTable';
import Button from '~/components/Button/Button';
import Line from '~/components/Line/Line';
import { useEffect, useState } from 'react';
import { getProductsInCartWithLimitAndPage } from '~/services/cartApi';
import { getAndCheckVoucherByCode } from '~/services/voucherApi';
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
import { createNewBill } from '~/services/billApi';
import { getPaymentMethodByLimitAndPage } from '~/services/paymentMethodApi';

const cx = classNames.bind(styles);

const Cart = () => {
    const [cart, setCart] = useState({});
    const [listCart, setListCart] = useState([]);
    const [voucher, setVoucher] = useState({});
    const [listPaymentMethod, setListPaymentMethod] = useState([]);

    const [couponCode, setCouponCode] = useState('');
    const [isUsableCoupon, setIsUsableCoupon] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('1');
    const [shippingMethod, setShippingMethod] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        fetchCart();
        // fetchVoucher();
        fetchPaymentMethod();
    }, []);

    const fetchCart = async () => {
        const res = await getProductsInCartWithLimitAndPage();
        setCart(res);
        setListCart(res.data);
    };

    const fetchPaymentMethod = async () => {
        const res = await getPaymentMethodByLimitAndPage();
        const options = res.data.map((payment) => ({
            value: payment.id,
            label: payment.name,
        }));
        setListPaymentMethod(options);
    };

    const getSubtotal = () => {
        return listCart.reduce((subtotal, item) => subtotal + item.quantity * item.variants.price, 0);
    };

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            toast.error('Vui lòng nhập mã giảm giá!');
            return;
        }

        try {
            const coupon = await getAndCheckVoucherByCode(couponCode);

            if (!coupon) {
                toast.error('Mã giảm giá không tồn tại!');
                return;
            }

            // Kiểm tra trạng thái của voucher
            if (coupon.status !== 'active') {
                toast.error('Mã giảm giá không hợp lệ hoặc đã hết hạn!');
                return;
            }

            // Kiểm tra thời gian hiệu lực
            const now = new Date();
            const startDate = new Date(coupon.startDate);
            const endDate = new Date(coupon.endDate);

            if (now < startDate) {
                toast.error('Mã giảm giá chưa có hiệu lực!');
                return;
            }
            if (now > endDate) {
                toast.error('Mã giảm giá đã hết hạn!');
                return;
            }

            if (coupon.quantity <= 0) {
                toast.error('Mã giảm giá đã hết!');
                return;
            }

            setVoucher({
                code: coupon.code,
                value: coupon.value,
            });
            setIsUsableCoupon(true);
            toast.success(`Áp dụng mã giảm giá thành công! Giảm ${coupon.value} VNĐ`);
        } catch (error) {
            console.error('Error fetching voucher:', error);
            toast.error(error.response.data.message);
        }
    };

    const handleCheckOutCart = async () => {
        if (!name.trim()) {
            toast.error('Tên không được để trống!');
            return;
        }
        if (!address.trim()) {
            toast.error('Địa chỉ không được để trống!');
            return;
        }

        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phone.trim() || !phoneRegex.test(phone)) {
            toast.error('Số điện thoại không hợp lệ!');
            return;
        }

        if (listCart.length === 0) {
            toast.error('Giỏ hàng của bạn đang trống!');
            return;
        }

        const products = listCart.map((item) => ({
            productVariantId: String(item.variants.id),
            quantity: Number(item.quantity),
        }));

        if (!Array.isArray(products) || products.length === 0) {
            toast.error('Danh sách sản phẩm không hợp lệ!');
            return;
        }

        const subtotal = getSubtotal();
        const discount = voucher.code && voucher.value ? Number(voucher.value) : 0;
        const totalPrice = Math.max(subtotal - discount, 0);

        const payload = {
            voucher: voucher.code ? String(voucher.code) : '',
            totalPrice,
            status: 'pending',
            fullName: String(name),
            deliverAddress: String(address),
            deliverPhone: String(phone),
            shippingMethod: String(shippingMethod),
            paymentMethod: String(paymentMethod),
            note: String(note),
            products,
        };

        console.log(payload);

        try {
            const res = await createNewBill(payload);
            if (res) {
                toast.success('Tạo mới đơn hàng thành công!');

                // reset data
                fetchCart();
                setName('');
                setAddress('');
                setPhone('');
                setPaymentMethod('');
                setShippingMethod('');
                setNote('');
                setCouponCode('');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'mb-[140px]')}>
                <Breadcrumb />
                <CartTable className="mb-[80px] mt-[-80px]" listCart={listCart} setListCart={setListCart} />
                <div className={cx('footer')}>
                    <div className={cx('left')}>
                        <div className={cx('left-top')}>
                            <div className={cx('left-item')}>
                                <input
                                    placeholder="Coupon Code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    style={isUsableCoupon ? { color: 'green' } : { color: 'red' }}
                                />
                                <Button primary onClick={handleApplyCoupon}>
                                    Apply Coupon
                                </Button>
                            </div>
                        </div>
                        <div className={cx('left-bottom')}>
                            <div className={cx('left-item')}>
                                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <input
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className={cx('left-item')}>
                                <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <select
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod((prev) => {
                                            console.log(prev, e.target.value);
                                            return e.target.value;
                                        })
                                    }
                                >
                                    {listPaymentMethod.map((payment) => (
                                        <option key={payment.value} value={payment.value}>
                                            {payment.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <input
                                placeholder="Ship method"
                                value={shippingMethod}
                                onChange={(e) => setShippingMethod(e.target.value)}
                            />

                            <textarea placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
                        </div>
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
                        <Button primary className="text-center" onClick={handleCheckOutCart}>
                            Proceed to checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

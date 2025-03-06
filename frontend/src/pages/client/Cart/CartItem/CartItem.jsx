import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import images from '~/assets/images';
import { IncreaseIcon, DecreaseIcon } from '~/components/Icons';
import { useState } from 'react';
import { decreaseQuantityInCart, increaseQuantityInCart } from '~/services/cartApi';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const CartItem = ({ data, setListCart }) => {
    const [quantity, setQuantity] = useState(data.quantity);

    // Hàm lấy giá trị từ attributes
    const getAttributeValue = (attrName) => {
        const attr = data.variants.attributes.find(
            (attr) => attr?.attributeName.toLowerCase() === attrName.toLowerCase(),
        );
        return attr ? attr.attributeValue : 'N/A'; // Trả về giá trị hoặc "N/A" nếu không tìm thấy
    };

    const size = getAttributeValue('Size');
    const color = getAttributeValue('Màu sắc');

    const handleIncrease = async () => {
        try {
            const res = await increaseQuantityInCart(data.id, data.variants.id, 1);
            if (res.status === 200) {
                setQuantity((prev) => prev + 1);
                setListCart((prevList) =>
                    prevList.map((item) => (item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item)),
                );
            } else {
                toast.error('Lỗi tăng số lượng:', res);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API tăng số lượng:', error);
            toast.error('Lỗi khi tăng số lượng giỏ hàng:', error);
        }
    };

    const handleDecrease = async () => {
        if (quantity > 1) {
            try {
                const res = await decreaseQuantityInCart(data.id, data.variants.id, 1);
                if (res.status === 200) {
                    setQuantity((prev) => prev - 1);
                    setListCart((prevList) =>
                        prevList.map((item) => (item.id === data.id ? { ...item, quantity: item.quantity - 1 } : item)),
                    );
                } else {
                    toast.error('Lỗi giảm số lượng:', res);
                }
            } catch (error) {
                toast.error('Lỗi khi giảm số lượng giỏ hàng:', error);
            }
        } else {
            toast.warn('Số lượng không thể nhỏ hơn 1');
        }
    };

    return (
        <>
            <tr className={cx('item')}>
                <td>
                    <div className={cx('row-wrapper')}>
                        <img src={data.images[0]} alt="item-in-cart" />
                        <span>{data.name}</span>
                    </div>
                </td>
                <td>
                    <div className={cx('row-wrapper')}>
                        <span>{size}</span>
                    </div>
                </td>
                <td>
                    <div className={cx('row-wrapper')}>
                        <span>{color}</span>
                    </div>
                </td>
                <td>
                    <div className={cx('row-wrapper')}>
                        <span>{data.variants.price}</span>
                    </div>
                </td>
                <td>
                    <div className={cx('row-wrapper')}>
                        <div className={cx('quantity-selector')}>
                            <div className={cx('quantity-value')}>{quantity}</div>
                            <div className={cx('controls')}>
                                <span onClick={handleIncrease}>
                                    <IncreaseIcon />
                                </span>

                                <span onClick={handleDecrease}>
                                    <DecreaseIcon />
                                </span>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div className={cx('row-wrapper')}>{quantity * data.variants.price}</div>
                </td>
            </tr>
        </>
    );
};

export default CartItem;

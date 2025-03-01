import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import images from '~/assets/images';
import { IncreaseIcon, DecreaseIcon } from '~/components/Icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

const CartItem = () => {
    const [quantity, setQuantity] = useState(1);
    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    return (
        <>
            <tr className={cx('item')}>
                <td>
                    <div className={cx('row-wrapper')}>
                        <img src={images.itemInCart} alt="item-in-cart" />
                        <span>LCD Monitor</span>
                    </div>
                </td>
                <td>
                    <div className={cx('row-wrapper')}>
                        <span>650$</span>
                    </div>
                </td>
                <td>
                    <div className={cx('row-wrapper')}>
                        <div className={cx('quantity-selector')}>
                            <div className={cx('quantity-value')}>{quantity}</div>
                            <div className={cx('controls')}>
                                <IncreaseIcon onClick={handleIncrease} />
                                <DecreaseIcon onClick={handleDecrease} />
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div className={cx('row-wrapper')}>heheh</div>
                </td>
            </tr>
        </>
    );
};

export default CartItem;

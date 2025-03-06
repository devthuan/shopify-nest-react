import classNames from 'classnames/bind';
import styles from './CartTable.module.scss';
import images from '~/assets/images';
import CartItem from '../CartItem/CartItem';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

const CartTable = ({ className, listCart, setListCart }) => {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('container')}>
                <table>
                    <thead>
                        <tr>
                            <th className={cx('header')}>Product</th>
                            <th className={cx('header')}>Size</th>
                            <th className={cx('header')}>Color</th>
                            <th className={cx('header')}>Price</th>
                            <th className={cx('header')}>Quantity</th>
                            <th className={cx('header')}>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCart &&
                            listCart.length > 0 &&
                            listCart.map((cart) => <CartItem key={cart.id} data={cart} setListCart={setListCart} />)}
                    </tbody>
                </table>
                <div className={cx('buttons-interact')}>
                    <Button secondary>Return To Shop</Button>
                    <Button secondary>Update Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default CartTable;

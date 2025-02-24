import classNames from 'classnames/bind';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

const Button = ({ children, className, green, primary, secondary, small }) => {
    return (
        <div
            className={cx('wrapper', className, {
                small,
            })}
        >
            <button className={cx('container', { green, primary, secondary, small })}>{children}</button>
        </div>
    );
};

export default Button;

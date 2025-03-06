import classNames from 'classnames/bind';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

const Button = ({ children, className, green, primary, secondary, small, widthFull, icon, onClick }) => {
    return (
        <div
            className={cx('wrapper', className, {
                small,
            })}
            onClick={onClick}
        >
            <button className={cx('container', { green, primary, secondary, small, widthFull })}>
                {icon}
                {children}
            </button>
        </div>
    );
};

export default Button;

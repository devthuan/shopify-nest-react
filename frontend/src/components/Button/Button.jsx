import classNames from 'classnames/bind';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

const Button = ({ text, width, height, marginTop, marginBottom }) => {
    const buttonStyles = {
        width,
        height,
        marginTop,
        marginBottom,
    };
    return (
        <div style={buttonStyles} className={cx('wrapper')}>
            <div className={cx('container')}>{text}</div>
        </div>
    );
};

export default Button;

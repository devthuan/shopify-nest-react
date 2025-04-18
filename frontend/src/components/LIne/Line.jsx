import classNames from 'classnames/bind';
import styles from './Line.module.scss';

const cx = classNames.bind(styles);
const Line = ({ vertical = false, toLeft = false, toRight = false, white = false, className }) => {
    return <div className={cx('line', { vertical, toLeft, toRight, white }, className)}></div>;
};
export default Line;

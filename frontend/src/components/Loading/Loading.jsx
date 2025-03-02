import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

const Loading = () => {
    return <div className={cx('shapes')}></div>;
};

export default Loading;

import classNames from 'classnames/bind';
import styles from './BrowseCategory.module.scss';
const cx = classNames.bind(styles);

const BrowseCategory = ({ title, icon }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {icon}
                <span className={cx('title')}>{title}</span>
            </div>
        </div>
    );
};

export default BrowseCategory;

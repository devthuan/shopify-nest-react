import classNames from 'classnames/bind';
import styles from '~/layouts/components/TopHeader/TopHeader.module.scss';
import { DropDownIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const TopHeader = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <span className={cx('title')}>
                        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                    </span>
                    <a className={cx('shop')}>ShopNow</a>
                </div>
                <div className={cx('languages')}>
                    <span className={cx('english')}>English</span>
                    <DropDownIcon className={cx('drop-icon')} />
                </div>
            </div>
        </div>
    );
};

export default TopHeader;

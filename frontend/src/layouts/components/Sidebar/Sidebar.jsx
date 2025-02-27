import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { CartIcon, HeartIcon, SearchIcon, UnderLine, UserIcon } from '~/components/Icons';
import { Link } from 'react-router';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>
                        <span>Exclusive</span>
                    </div>
                    <div className={cx('nav')}>
                        {['Home', 'Shop', 'Categories', 'Contact', 'About', 'Sign Up'].map((item, index) => (
                            <Link key={index} className={cx('nav-item')}>
                                <span>{item}</span>
                                {item === 'Home' && <UnderLine width="100%" />}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('search-wrapper')}>
                        <div className={cx('search-inner')}>
                            <input placeholder="What are you looking for?" />
                            <SearchIcon />
                        </div>
                    </div>
                    <div className={cx('more')}>
                        <HeartIcon />
                        <CartIcon />
                        <UserIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

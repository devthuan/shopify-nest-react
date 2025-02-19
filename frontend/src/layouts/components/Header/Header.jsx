import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { CartIcon, HeartIcon, SearchIcon, UnderLine } from '~/components/Icons';
import { Link } from 'react-router';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>
                        <span>Exclusive</span>
                    </div>
                    <div className={cx('nav')}>
                        <Link className={cx('nav-item')}>
                            <span>Home</span>
                            <UnderLine width="100%" />
                        </Link>
                        <Link className={cx('nav-item')}>
                            <span>Contact</span>
                        </Link>
                        <Link className={cx('nav-item')}>
                            <span>About</span>
                        </Link>
                        <Link className={cx('nav-item')}>
                            <span>Sign Up</span>
                        </Link>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

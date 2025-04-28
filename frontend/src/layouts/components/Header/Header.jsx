import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { CartIcon, HeartIcon, SearchIcon, UnderLine, UserIcon } from '~/components/Icons';
import { Link, useNavigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Categories', path: '/categories' },
        { name: 'Contact', path: '/contact' },
        { name: 'About', path: '/about' },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>
                        <span>Exclusive</span>
                    </div>
                    <div className={cx('nav')}>
                        {navItems.map((item, index) => (
                            <Link to={item.path} key={index} className={cx('nav-item')}>
                                <span>{item.name}</span>
                                {location.pathname === item.path && <UnderLine width="100%" />}
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
                        {isAuthenticated ? (
                            <>
                                <span>
                                    <HeartIcon />
                                </span>
                                <span onClick={() => navigate('/cart')}>
                                    <CartIcon />
                                </span>
                                <span>
                                    <UserIcon />
                                </span>
                            </>
                        ) : (
                            <>
                                <button className={cx('btn-sign-in')} onClick={() => navigate('/login')}>
                                    Sign in
                                </button>
                                <button className={cx('btn-sign-up')} onClick={() => navigate('/register')}>
                                    Sign up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

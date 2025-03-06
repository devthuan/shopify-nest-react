import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';
import { Link, useLocation } from 'react-router';
const cx = classNames.bind(styles);

const Breadcrumb = ({ className }) => {
    const location = useLocation();
    let currentLink = '';

    const crumbs = location.pathname
        .split('/')
        .filter((crumb) => crumb !== '')
        .map((crumb, index, array) => {
            currentLink += `/${crumb}`;
            return (
                <span className={cx('crumb-container')} key={crumb}>
                    <Link className={cx('crumb')} to={currentLink}>
                        {crumb}
                    </Link>
                    {index < array.length - 1 && <span className={cx('separator')}>/</span>}
                </span>
            );
        });

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('container')}>
                <span className={cx('crumb-container')}>
                    <Link className={cx('crumb')} to="/">
                        Home
                    </Link>
                    {crumbs.length > 0 && <span className={cx('separator')}>/</span>}
                </span>
                {crumbs}
            </div>
        </div>
    );
};

export default Breadcrumb;

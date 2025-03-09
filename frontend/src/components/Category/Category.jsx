import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import CategoryItem from './CategoryItem/CategoryItem';
import Line from '../Line/Line';

const cx = classNames.bind(styles);
const Category = () => {
    return (
        <div className={cx('wrapper')}>
            <CategoryItem haveChild text={'Woman’s Fashion'} />
            <CategoryItem haveChild text={'Men’s Fashion'} />
            <Line vertical className={cx('line-4')} />
        </div>
    );
};

export default Category;

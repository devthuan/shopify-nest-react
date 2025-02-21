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
            <CategoryItem text={'Electronics'} />
            <CategoryItem text={'Home & Lifestyle'} />
            <CategoryItem text={'Medicine'} />
            <CategoryItem text={'Sports & Outdoor'} />
            <CategoryItem text={'Baby’s & Toys'} />
            <CategoryItem text={'Groceries & Pets'} />
            <CategoryItem text={'Health & Beauty'} />
            <Line vertical className={cx('line-4')} />
        </div>
    );
};

export default Category;

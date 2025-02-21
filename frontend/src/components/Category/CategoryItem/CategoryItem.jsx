import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import { DropDownIcon, DropDownRightIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const CategoryItem = ({ haveChild, text }) => {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('text')}>{text}</span>
            {haveChild && <DropDownRightIcon className={cx('icon')} />}
        </div>
    );
};

export default CategoryItem;

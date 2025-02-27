import classNames from 'classnames/bind';
import styles from './ServiceItem.module.scss';
import { ServiceItemCircleIcon, ServiceItemDeliveryIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const ServiceItem = ({ innerIcon, heading, title }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <ServiceItemCircleIcon className={cx('wrapper-icon')} />
                <div className={cx('inner-icon')}>{innerIcon}</div>
            </div>
            <div className={cx('content')}>
                <div className={cx('heading')}>{heading}</div>
                <div className={cx('title')}>{title}</div>
            </div>
        </div>
    );
};

export default ServiceItem;

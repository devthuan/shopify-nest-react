import classNames from 'classnames/bind';
import styles from './FullServices.module.scss';
import ServiceItem from './ServiceItem/ServiceItem';
import { ServiceItemDeliveryIcon } from '../Icons';

const cx = classNames.bind(styles);
const FullServices = ({ className }) => {
    return (
        <div className={cx('wrapper', className)}>
            <ServiceItem
                innerIcon={<ServiceItemDeliveryIcon />}
                heading={'FREE AND FAST DELIVERY'}
                title={'Free delivery for all orders over $140'}
            />

            <ServiceItem
                innerIcon={<ServiceItemDeliveryIcon />}
                heading={'FREE AND FAST DELIVERY'}
                title={'Free delivery for all orders over $140'}
            />

            <ServiceItem
                innerIcon={<ServiceItemDeliveryIcon />}
                heading={'FREE AND FAST DELIVERY'}
                title={'Free delivery for all orders over $140'}
            />
        </div>
    );
};

export default FullServices;

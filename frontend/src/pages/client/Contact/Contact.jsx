import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { CallContactIcon, MailContactIcon } from '~/components/Icons';
import { Line } from 'recharts';
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb';

const cx = classNames.bind(styles);

const Contact = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'mb-[140px]')}>
                <Breadcrumb />
                <div className={cx('content')}>
                    <div className={cx('left')}>
                        <div className={cx('top')}>
                            <div className={cx('heading')}>
                                <CallContactIcon />
                                <span>Call To Us</span>
                            </div>
                            <div className={cx('description')}>
                                <div>We are available 24/7, 7 days a week.</div>
                                <div>Phone: +8801611112222</div>
                            </div>
                        </div>
                        <div className="relative mt-[32px] mb-[32px]">
                            <Line />
                        </div>
                        <div className={cx('bottom')}>
                            <div className={cx('heading')}>
                                <MailContactIcon />
                                <span>Write To Us</span>
                            </div>
                            <div className={cx('description')}>
                                <span>Fill out our form and we will contact you within 24 hours.</span>
                                <span>Emails: customer@exclusive.com</span>
                                <span>Emails: support@exclusive.com</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('top')}>
                            <input placeholder="Your Name *" />
                            <input placeholder="Your Email *" />
                            <input placeholder="Your Phone *" />
                        </div>
                        <div className={cx('middle')}>
                            <textarea placeholder="Your Message" />
                        </div>
                        <div className={cx('bottom')}>
                            <Button primary>Send Message</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { CopyRightIcon, FacebookIcon, InstaIcon, LikendinIcon, SendIcon, TwitterIcon } from '~/components/Icons';
import images from '~/assets/images';
import Line from '~/components/LIne/Line';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('c-743')}>
                        <div className={cx('c-717')}>
                            <div className={cx('c-716')}>
                                <div className={cx('c-715')}>
                                    <div className={cx('logo')}>Exclusive</div>
                                    <div className={cx('sub')}>Subscribe</div>
                                </div>
                                <div className={cx('c-716-bot')}>Get 10% off your first order</div>
                            </div>
                            <div className={cx('mail')}>
                                <input placeholder="Enter your email" />
                                <SendIcon />
                            </div>
                        </div>

                        <div className={cx('c-713')}>
                            <div className={cx('title')}>Support</div>
                            <div className={cx('c-712')}>
                                <div className={cx('c-712-item')}>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</div>
                                <div className={cx('c-712-item')}>exclusive@gmail.com</div>
                                <div className={cx('c-712-item')}>+88015-88888-9999</div>
                            </div>
                        </div>

                        <div className={cx('c-711')}>
                            <div className={cx('title')}>Account</div>
                            <div className={cx('c-710')}>
                                <div className={cx('c-710-item')}>My Account</div>
                                <div className={cx('c-710-item')}>Login / Register</div>
                                <div className={cx('c-710-item')}>Cart</div>
                                <div className={cx('c-710-item')}>Wishlist</div>
                                <div className={cx('c-710-item')}>Shop</div>
                            </div>
                        </div>

                        <div className={cx('c-711')}>
                            <div className={cx('title')}>Quick Link</div>
                            <div className={cx('c-710')}>
                                <div className={cx('c-710-item')}>Privacy Policy</div>
                                <div className={cx('c-710-item')}>Terms Of Use</div>
                                <div className={cx('c-710-item')}>FAQ</div>
                                <div className={cx('c-710-item')}>Contact</div>
                            </div>
                        </div>

                        <div className={cx('c-742')}>
                            <div className={cx('c-721')}>
                                <div className={cx('title')}>Download App</div>
                                <div className={cx('c-721-child')}>
                                    <div className={cx('text')}>Save $3 with App New User Only</div>
                                    <div className={cx('c-721-child-child')}>
                                        <div className={cx('qr')}>
                                            <img src={images.qrCode} alt="qr-code" />
                                        </div>
                                        <div className={cx('c-721-child-child-child')}>
                                            <div className={cx('googleplay')}>
                                                <img src={images.googlePlay} alt="google-play" />
                                            </div>
                                            <div className={cx('appstore')}>
                                                <img src={images.appStore} alt="app-store" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('c-741')}>
                                <FacebookIcon />
                                <TwitterIcon />
                                <InstaIcon />
                                <LikendinIcon />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'relative' }} className={cx('footer')}>
                    <Line white />
                    <div className={cx('c-67')}>
                        <div className={cx('c-66')}>
                            <CopyRightIcon />
                            <span className={cx('copy-right-title')}>Copyright Rimel 2022. All right reserved</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

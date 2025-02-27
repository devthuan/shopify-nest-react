import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { GoogleIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const Register = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'mt-[60px] mb-[140px]')}>
                <div className={cx('left')}>
                    <img src={images.loginAndRegisterImg} alt="anh-login-register" />
                </div>

                <div className={cx('right')}>
                    <div className={cx('heading', 'mb-[24px]')}>Create an account</div>
                    <div className={cx('title', 'mb-[48px]')}>Enter your details below</div>
                    <form className={cx('form')}>
                        <input placeholder="Name" name="name" />
                        <input placeholder="Email or Phone Number" name="username" />
                        <input placeholder="Password" name="password" />
                        <div className={cx('footer')}>
                            <Button primary widthFull className="mb-[16px]">
                                Log in
                            </Button>
                            <Button secondary widthFull icon={<GoogleIcon />} className="mb-[32px]">
                                Sign up with Google
                            </Button>
                            <div className={cx('nav-login')}>
                                <span>Already have account?</span>
                                <a className={cx('nav-login-btn')}>Log in</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

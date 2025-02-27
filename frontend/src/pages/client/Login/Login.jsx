import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

const Login = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'mt-[60px] mb-[140px]')}>
                <div className={cx('left')}>
                    <img src={images.loginAndRegisterImg} alt="anh-login-register" />
                </div>

                <div className={cx('right')}>
                    <div className={cx('heading', 'mb-[24px]')}>Log in to Exclusive</div>
                    <div className={cx('title', 'mb-[48px]')}>Enter your details below</div>
                    <form className={cx('form')}>
                        <input placeholder="Email or Phone Number" name="username" />
                        <input placeholder="Password" name="password" />
                        <div className={cx('footer')}>
                            <Button primary>Log in</Button>
                            <span className={cx('forgot-password')}>Forget Password?</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

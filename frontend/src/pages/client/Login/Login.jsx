import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { login } from '~/services/authApi';
import { setItemWithExpiration } from '~/services/localStorage';
import { setAccessToken } from '~/redux/features/user/userSlice';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.user.accessToken);

    useEffect(() => {
        if (accessToken) {
            navigate('/'); // Nếu đã đăng nhập, chuyển hướng về trang chủ
        }
    }, [accessToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const loginData = {
            email: emailOrUsername.includes('@') ? emailOrUsername : '', // Xác định email hoặc username
            username: emailOrUsername.includes('@') ? '' : emailOrUsername,
            password,
            ip: '0.0.0.0', // Cần lấy IP thực tế nếu có backend hỗ trợ
        };

        try {
            const response = await login(loginData);
            setItemWithExpiration('accessToken', response.data.accessToken);
            // Lưu user vào Redux
            dispatch(setAccessToken(response.data.accessToken));
            toast.success(response.message);
        } catch (error) {
            console.log(error);
            toast.error(
                Array.isArray(error.response.data.message)
                    ? error.response.data.message[0]
                    : error.response.data.message,
            );
        } finally {
            setIsLoading(false);
        }
    };
    if (accessToken) return null;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'mt-[60px] mb-[140px]')}>
                <div className={cx('left')}>
                    <img src={images.loginAndRegisterImg} alt="anh-login-register" />
                </div>

                <div className={cx('right')}>
                    <div className={cx('heading', 'mb-[24px]')}>Log in to Exclusive</div>
                    <div className={cx('title', 'mb-[48px]')}>Enter your details below</div>
                    <form className={cx('form')} onSubmit={handleSubmit}>
                        <input
                            placeholder="Email or Phone Number"
                            name="emailOrUsername"
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={cx('footer')}>
                            <Button primary type="submit" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Log in'}
                            </Button>
                            <span className={cx('forgot-password')}>Forget Password?</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { GoogleIcon } from '~/components/Icons';
import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { register } from '~/services/authApi';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const accessToken = useSelector((state) => state.user.accessToken);

    useEffect(() => {
        if (accessToken) {
            navigate('/'); // Nếu đã đăng nhập, chuyển hướng về trang chủ
        }
    }, [accessToken, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // validate
        if (!formData.username.trim()) {
            toast.error('Username is required');
            return;
        } else if (formData.username.length < 5) {
            toast.error('Username is must have at least 5 characters');
            return;
        }
        if (!formData.email.trim()) {
            toast.error('Email is required');
            return;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Email is invalid');
            return;
        }
        if (!formData.password) {
            toast.error('Password is required');
            return;
        } else if (formData.password.length < 6) {
            toast.error('Password is must have at least 6 characters');
            return;
        }
        if (formData.confirmPassword !== formData.password) {
            toast.error('Password and Confirm Password must be the same');
            return;
        }

        setIsLoading(true);
        try {
            const res = await register(formData);
            if (res && res.status === 201) {
                toast.success(res?.data?.message || 'Account created successfully!');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const { message } = error.response.data;
                if (Array.isArray(message)) {
                    toast.error(message[0]);
                } else {
                    toast.error(message);
                }
            } else {
                toast.error('Something went wrong, please try again!');
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'mt-[60px] mb-[140px]')}>
                <div className={cx('left')}>
                    <img src={images.loginAndRegisterImg} alt="anh-login-register" />
                </div>

                <div className={cx('right')}>
                    <div className={cx('heading', 'mb-[24px]')}>Create an account</div>
                    <div className={cx('title', 'mb-[48px]')}>Enter your details below</div>
                    <form className={cx('form')} onSubmit={handleRegister}>
                        <input placeholder="Username" name="username" onChange={handleChange} />
                        <input placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleChange}
                        />

                        <div className={cx('footer')}>
                            <Button primary widthFull className="mb-[16px]" type="submit" disabled={isLoading}>
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                            <Button secondary widthFull icon={<GoogleIcon />} className="mb-[32px]">
                                Sign up with Google
                            </Button>
                            <div className={cx('nav-login')}>
                                <span>Already have an account?</span>
                                <Link className={cx('nav-login-btn')} to={'/login'}>
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

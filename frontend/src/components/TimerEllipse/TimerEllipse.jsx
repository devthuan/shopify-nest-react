import classNames from 'classnames/bind';
import styles from './TimerEllipse.module.scss';
import { useEffect, useState } from 'react';
import { Ellipse20Icon, EllipseTimerIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const TimerEllipse = ({ className }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 10,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    } else if (days > 0) {
                        days--;
                        hours = 23;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        clearInterval(timer);
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('container')}>
                <div className={cx('item')}>
                    <Ellipse20Icon />
                    <div className={cx('title')}>
                        <span className={cx('title-top')}>{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className={cx('title-bottom')}>Days</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <Ellipse20Icon />
                    <div className={cx('title')}>
                        <span className={cx('title-top')}>{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className={cx('title-bottom')}>Hours</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <Ellipse20Icon />
                    <div className={cx('title')}>
                        <span className={cx('title-top')}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className={cx('title-bottom')}>Minutes</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <Ellipse20Icon />
                    <div className={cx('title')}>
                        <span className={cx('title-top')}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className={cx('title-bottom')}>Seconds</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimerEllipse;

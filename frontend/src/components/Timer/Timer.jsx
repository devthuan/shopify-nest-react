import classNames from 'classnames/bind';
import styles from './Timer.module.scss';
import { useEffect, useState } from 'react';
import { EllipseTimerIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const Timer = ({ expireTime }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
       
       
        setTimeLeft({
            days: expireTime,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
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
        <div className={cx('wrapper')}>
            <div className={cx('item')}>
                <span className={cx('top')}>Days</span>
                <span className={cx('bottom')}>{String(timeLeft.days).padStart(2, '0')}</span>
            </div>
            <div className={cx('dot')}>
                <EllipseTimerIcon />
                <EllipseTimerIcon />
            </div>
            <div className={cx('item')}>
                <span className={cx('top')}>Hours</span>
                <span className={cx('bottom')}>{String(timeLeft.hours).padStart(2, '0')}</span>
            </div>
            <div className={cx('dot')}>
                <EllipseTimerIcon />
                <EllipseTimerIcon />
            </div>
            <div className={cx('item')}>
                <span className={cx('top')}>Minutes</span>
                <span className={cx('bottom')}>{String(timeLeft.minutes).padStart(2, '0')}</span>
            </div>
            <div className={cx('dot')}>
                <EllipseTimerIcon />
                <EllipseTimerIcon />
            </div>
            <div className={cx('item')}>
                <span className={cx('top')}>Seconds</span>
                <span className={cx('bottom')}>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
        </div>
    );
};

export default Timer;

import classNames from 'classnames/bind';
import styles from './TopBanner.module.scss';
import { useEffect, useState } from 'react';
import { EllipseIcon, EllipseSelectedIcon } from '../Icons';
const cx = classNames.bind(styles);

const TopBanner = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const slideStyles = {
        backgroundImage: `url(${slides[currentIndex]})`,
    };

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered, slides.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={cx('wrapper')}>
            <div style={slideStyles} className={cx('container')}></div>
            <div className={cx('slide-change')}>
                {slides.map((slide, index) => (
                    <div key={`top-banner-${index}`}>
                        {index === currentIndex ? (
                            <div onClick={() => goToSlide(index)}>
                                <EllipseSelectedIcon />
                            </div>
                        ) : (
                            <div onClick={() => goToSlide(index)}>
                                <EllipseIcon />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* <button onClick={prevSlide} className={cx('prev')}>
                ❮
            </button>
            <button onClick={nextSlide} className={cx('next')}>
                ❯
            </button> */}
        </div>
    );
};

export default TopBanner;

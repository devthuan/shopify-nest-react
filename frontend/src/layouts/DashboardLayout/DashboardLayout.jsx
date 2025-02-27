import classNames from 'classnames/bind';
import styles from './DashboardLayout.module.scss';
const cx = classNames.bind(styles);
const DashboardLayout = ({ children }) => {
    return (
        <div className={cx('flex w-full gap-[30px]')}>
            <div className="w-[240px] h-screen">sidebar</div>

            <div className="flex-1">
                <div className="h-[70px] w-full ">
                    <div className="w-full">top header</div>
                </div>
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;

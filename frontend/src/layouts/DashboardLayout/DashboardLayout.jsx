import classNames from 'classnames/bind';
import styles from './DashboardLayout.module.scss';
import Sidebar from '../components/Sidebar/Sidebar';
import HeaderDashboard from '../components/HeaderDashboard/HeaderDashboard';
const cx = classNames.bind(styles);
const DashboardLayout = ({ children }) => {
    return (
        <div className={cx("flex w-full h-screen ")}>
            {/* Sidebar */}
            <div className="w-[240px] h-screen fixed bg-white z-10">
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 ml-[240px] h-screen">
                {/* Header */}
                <div className="h-[70px] bg-white fixed w-[calc(100%-240px)] z-10">
                    <HeaderDashboard />
                </div>

                {/* Content */}
                <div className="w-full  bg-[#F5F6FA] flex-1 p-[30px] mt-[70px] overflow-y-auto">
                    <div className="w-full max-w-[1440px] mx-auto">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

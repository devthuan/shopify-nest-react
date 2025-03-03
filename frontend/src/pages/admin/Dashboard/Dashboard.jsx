import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import {
    TotalOrderIcon,
    TotalPendingIcon,
    TotalSalesIcon,
    TrendingDownIcon,
    TrendingUpIcon,
    UserDashboardIcon,
} from '~/components/Icons';
import AreaChart from '~/components/AreaChart/AreaChart';
const cx = classNames.bind(styles);

const Dashboard = () => {
    const listBoxDashboard = [
        {
            icon: <UserDashboardIcon />,
            trendingIcon: <TrendingUpIcon />,
            title: 'Total User',
            data: '40,689',
            percent: '8.5%',
            status: 'up',
        },

        {
            icon: <TotalOrderIcon />,
            trendingIcon: <TrendingUpIcon />,
            title: 'Total Order',
            data: '10293',
            percent: '1.3%',
            status: 'up',
        },

        {
            icon: <TotalSalesIcon />,
            trendingIcon: <TrendingDownIcon />,
            title: 'Total Sales',
            data: '$89,000',
            percent: '4.3%',
            status: 'down',
        },
        {
            icon: <TotalPendingIcon />,
            trendingIcon: <TrendingDownIcon />,
            title: 'Total Pending',
            data: '2040',
            percent: '1.8%',
            status: 'down',
        },
    ];

    const renderBoxStatistic = (item, index) => {
        return (
            <div key={index} className="w-full h-full ">
                <div className="w-full h-full left-0 top-0 p-[16px]  bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between ">
                        <div className="">
                            <div className="opacity-70 text-[#202224] text-[16px] font-semibold font-['Nunito Sans']">
                                {item.title}
                            </div>
                            <div className="mt-[16px] text-[#202224] text-[28px] font-bold font-['Nunito Sans'] tracking-wide">
                                {item.data}
                            </div>
                        </div>
                        <div data-svg-wrapper className="left-[170px] top-[16px] ">
                            {item.icon}
                        </div>
                    </div>

                    <div className="w-full h-6 flex mt-[25px] ">
                        <div data-svg-wrapper className="left-0 top-0 ">
                            {item.trendingIcon}
                        </div>
                        <div className="">
                            <span
                                className={`text-[#00b69b] text-[16px] font-semibold font-['Nunito Sans'] 
                                                ${item.status === 'up' ? 'text-[#00b69b]' : 'text-[#ff5b5b]'}`}
                            >
                                {item.percent}
                            </span>
                            <span className="text-[#12153c] text-[16px] font-semibold font-['Nunito Sans']"> </span>
                            <span className=" text-[#606060] text-[15px] font-semibold font-['Nunito Sans']">
                                Up from yesterday
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderBoxChart = (title, chartType) => {
        return (
            <div className=" w-full h-[444px] bg-white mt-[30px] p-[32px]">
                <div className="w-full flex justify-between">
                    <h1 className="text-[24px] text-[#202224] font-medium">{title}</h1>
                    <div className="w-[104px] h-[28px] border-2  border-[#D5D5D5]">
                        <select
                            id="date"
                            name="date"
                            defaultValue="5"
                            className="w-full h-[28px] text-[16px] text-[#202224] border-[none] border-b-[1px solid #E5E5E5]"
                        >
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                </div>
                <div className="w-full h-full mt-[15px] pb-[10px]">{chartType}</div>
            </div>
        );
    };

    return (
        <div className={cx('w-full')}>
            <h1 className="text-[32px] font-medium text-[#202224] ">Dashboard</h1>
            <div className="w-full mt-[27px]">
                <div className="grid grid-cols-4 grid-rows-1 gap-[30px] h-[161px]">
                    {listBoxDashboard.map((item, index) => renderBoxStatistic(item, index))}
                </div>
            </div>
            {renderBoxChart('Sales Details', <AreaChart width={'100%'} height={'100%'} />)}
            {renderBoxChart('Sales Details', <AreaChart width={'100%'} height={'100%'} />)}
        </div>
    );
};

export default Dashboard;

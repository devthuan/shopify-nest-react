import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import Pagination from '~/components/Pagination/Pagination';
const cx = classNames.bind(styles);

const Order = () => {
   
    const renderBoxFilter = () => {
        return (
            <div className="min-w-[888px] w-full h-[70px] ">
                <div className="flex items-center w-fit h-[70px] bg-[#f8f9fa] rounded-[10px] border border-neutral-300">
                    <div data-svg-wrapper className="pl-[24px]">
                        <svg width="46" height="72" viewBox="0 0 46 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.686151"
                                d="M45.5 71V1"
                                stroke="#979797"
                                strokeWidth="0.3"
                                strokeLinecap="square"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11 33.75C16.3848 33.75 20.75 31.7353 20.75 29.25C20.75 26.7647 16.3848 24.75 11 24.75C5.61522 24.75 1.25 26.7647 1.25 29.25C1.25 31.7353 5.61522 33.75 11 33.75Z"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1.25 29.25C1.25253 33.7655 4.35614 37.688 8.75 38.729V45C8.75 46.2426 9.75736 47.25 11 47.25C12.2426 47.25 13.25 46.2426 13.25 45V38.729C17.6439 37.688 20.7475 33.7655 20.75 29.25"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="h-full flex items-center justify-center px-[26px] text-[#202224] text-[14px] font-bold font-['Nunito Sans'] border border-neutral-300">
                        Filter By
                    </div>

                    <div className="h-full px-[24px] flex justify-center items-center gap-[24px]  text-[#202224] text-[14px] font-bold font-['Nunito Sans'] border border-neutral-300">
                        <p>Date</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path
                                d="M7.415 8.71L12 13.295L16.585 8.71L18 10.125L12 16.125L6 10.125L7.415 8.71Z"
                                fill="black"
                            />
                        </svg>
                    </div>

                    <div className="h-full px-[24px] flex justify-center items-center gap-[24px]  text-[#202224] text-[14px] font-bold font-['Nunito Sans'] border border-neutral-300">
                        <p>Order type</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path
                                d="M7.415 8.71L12 13.295L16.585 8.71L18 10.125L12 16.125L6 10.125L7.415 8.71Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <div className="h-full px-[24px] flex justify-center items-center gap-[24px]  text-[#202224] text-[14px] font-bold font-['Nunito Sans'] border border-neutral-300">
                        <p>Order Status</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path
                                d="M7.415 8.71L12 13.295L16.585 8.71L18 10.125L12 16.125L6 10.125L7.415 8.71Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <div className="h-full px-[26px] flex justify-center items-center gap-[10px]  text-[#202224] text-[14px] font-bold font-['Nunito Sans'] border border-neutral-300">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 3.75V0.75L5.25 4.5L9 8.25V5.25C11.4825 5.25 13.5 7.2675 13.5 9.75C13.5 12.2325 11.4825 14.25 9 14.25C6.5175 14.25 4.5 12.2325 4.5 9.75H3C3 13.065 5.685 15.75 9 15.75C12.315 15.75 15 13.065 15 9.75C15 6.435 12.315 3.75 9 3.75Z"
                                fill="#EA0234"
                            />
                        </svg>
                        <p className=" text-[#ea0234] text-[14px] font-semibold font-['Nunito Sans']">Reset Filter</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderTable = () => {
        const listTitleTable = ['Order ID', 'Customer', 'Date', 'Total', 'Payment', 'Status', 'Action'];
        const listData = [
            {
                id: 1,
                customer: 'Doe',
                date: 'John',
                total: '$120.00',
                payment: 'Paid',
                status: 'Delivered',
            },
            {
                id: 2,
                customer: 'Moe',
                date: 'Mary',
                total: '$120.00',
                payment: 'Paid',
                status: 'Delivered',
            },
            {
                id: 3,
                customer: 'Dooley',
                date: 'Sam',
                total: '$120.00',
                payment: 'Paid',
                status: 'Delivered',
            },
        ];

        return (
            <div className="overflow-hidden rounded-[14px] border border-neutral-300 p-[10px] bg-white">
                <table className="w-full   ">
                    <thead className="">
                        <tr className="">
                            {listTitleTable?.map((item, index) => {
                                return (
                                    <th
                                        key={index}
                                        className="text-start border-b py-[20px] text-[14px] border-neutral-300"
                                    >
                                        {item}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="">
                        {listData?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="border-b py-[20px] text-[14px] border-neutral-300">{item.id}</td>
                                    <td className="border-b py-[20px] text-[14px] border-neutral-300">
                                        {item.customer}
                                    </td>
                                    <td className="border-b py-[20px] text-[14px] border-neutral-300">{item.date}</td>
                                    <td className="border-b py-[20px] text-[14px] border-neutral-300">
                                        <span>{item.total}</span>
                                    </td>
                                    <td className="border-b py-[20px] text-[14px] border-neutral-300">
                                        {item.payment}
                                    </td>
                                    <td className="border-b py-[20px] text-[14px] border-neutral-300">{item.status}</td>
                                    <td className="border-b py-[20px] text-[14px] border-neutral-300">View</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="">
                    <Pagination />
                </div>
            </div>
        );
    };

    return (
        <div className={cx('w-full')}>
            <h1 className="text-[32px] font-medium text-[#202224] ">Orders</h1>

            {/* filter */}
            <div className="w-full mt-[23px]">{renderBoxFilter()}</div>

            {/* table */}
            <div className="mt-[24px] ">{renderTable()}</div>
        </div>
    );
};

export default Order;

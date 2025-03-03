import { DropDownLeftIcon, DropDownRightIcon } from '../Icons';
import { useState } from 'react';

const Pagination = ({
    total = 100,
    totalPages = 100,
    currentPageParams = 1,
    limit = 10,
    optionLimit = [10, 20, 30, 40],
}) => {
    const [currentPage, setCurrentPage] = useState(currentPageParams);
    const [limitPage, setLimitPage] = useState(optionLimit[0]);

    const handlePageChange = (page) => {
        console.log(page);
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleLimitPage = (e) => {
        setLimitPage(e);
        setCurrentPage(1);
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        // Nút previous
        buttons.push(
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
                <DropDownLeftIcon />
            </button>,
        );

        // Các nút trang
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`relative inline-flex items-center px-4 py-3  font-semibold text-[12px]
                            ${
                                currentPage === i
                                    ? 'bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            }`}
                    >
                        {i}
                    </button>,
                );
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                buttons.push(
                    <span
                        key={`ellipsis-${i}`}
                        className="relative inline-flex items-center px-4 py-3  font-semibold text-[12px] text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
                    >
                        ...
                    </span>,
                );
            }
        }

        // Nút next
        buttons.push(
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
                <DropDownRightIcon />
            </button>,
        );

        return buttons;
    };

    return (
        <div className="flex w-full h-[50px]  justify-between items-center   mt-[30px] px-[10px]">
            <div className=" ">
                <select
                    className="text-[14px] border border-neutral-300 px-[20px] py-[8px]"
                    value={limitPage}
                    onChange={(e) => handleLimitPage(parseInt(e.target.value))}
                >
                    {optionLimit?.map((option) => (
                        <option key={option} value={option}>
                            Show {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className="">
                <div className="flex items-center justify-between  bg-white px-4 py-3 sm:px-6">
                    {renderPaginationButtons()}
                </div>
            </div>
        </div>
    );
};

export default Pagination;

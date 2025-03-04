import classNames from 'classnames/bind';
import styles from '~/layouts/components/HeaderDashboard/HeaderDashboard.module.scss';
import images from '~/assets/images';
import { ApplicationErrorIcon, DropDownIcon, SearchIcon } from '~/components/Icons';
import { useState } from 'react';
const cx = classNames.bind(styles);

const HeaderDashboard = () => {
    const [isOpenNotification, setIsOpenNotification] = useState(false);

    const generateContentNotification = () => {
        return (
            <div className="w-[300px] h-[333px] relative">
                <div className=" p-[20px] w-[300px] h-[333px]  bg-[white] rounded-[14px] shadow-[0px_4px_40px_0px_rgba(0,0,0,0.16)]">
                    <div className="h-[38px] border-b-2 text-black text-[15px] font-semibold font-['Nunito Sans']">
                        Notification
                    </div>
                    <div className="w-full h-[60px] flex justify-center items-center gap-[12px]">
                        <div className="">
                            <ApplicationErrorIcon />
                        </div>
                        <div className="w-full h-[60px] flex flex-col justify-center ">
                            <div className=" text-black text-[14px] font-semibold font-['Nunito Sans']">
                                Application Error
                            </div>
                            <div className=" text-black text-[12px] font-semibold font-['Nunito Sans']">
                                Check Your runnung application
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[31px] left-0 top-[288px] absolute flex justify-center items-center1">
                        <div className="cursor-pointer text-black text-[13px] font-normal font-['Circular Std']">
                            See all notification
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className={cx('w-full h-full flex items-center px-[30px] ')}>
            <img src={images.menuIcon} alt="logo" className="w-[22px] mr-[25px]" />
            <div className="flex items-center justify-between w-full">
                <div className=" relative flex items-center">
                    {/* box input search */}
                    <div className="flex justify-center">
                        <input
                            placeholder="Search"
                            className="pl-[45px] w-[388px] h-[38px] text-[14px] bg-[#f5f6fa] rounded-[19px] border border-neutral-300"
                        />
                        <SearchIcon
                            className={'absolute left-[15px] top-[50%] transform translate-y-[-50%] bg-[F5F6FA]'}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-[31px]  mr-[20px] ">
                    {/* box notification */}
                    <div className="flex items-center relative">
                        <div onClick={() => setIsOpenNotification(!isOpenNotification)} className="">
                            <img className="w-[24px] h-[24px]" src={images.alertIcon} alt="alert" />
                            <p className="absolute top-[-10px] right-[-10px] text-[14px] text-black text-center font-medium bg-red-500 w-[20px] h-[20px] rounded-[50px]">
                                9
                            </p>
                        </div>
                        <div className="absolute top-14 right-0">
                            {isOpenNotification ? generateContentNotification() : ''}
                        </div>
                    </div>

                    {/* box change language */}
                    <div className="">
                        <span className="text-[14px] text-[#404040]">English</span>
                    </div>

                    {/* box avatar */}
                    <div className="flex items-center">
                        <img className="w-[50px] h-[50px]" src={images.avatarImg} alt="image" />
                        <div className="ml-[10px]">
                            <p className="text-[14px] text-[#404040] font-bold">John Doe</p>
                            <p className="text-[12px]">Admin</p>
                        </div>
                        <div className="ml-[10px] w-[30px] h-[30px] rounded-[50px] border-2 border-solid flex justify-center items-center">
                            <DropDownIcon color={'#565656'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderDashboard;

import classNames from 'classnames/bind';
import styles from '~/layouts/components/HeaderDashboard/HeaderDashboard.module.scss';
import images from '~/assets/images';
import { DropDownIcon, SearchIcon } from '~/components/Icons';
const cx = classNames.bind(styles);

const HeaderDashboard = () => {
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
                        <img className="w-[24px] h-[24px]" src={images.alertIcon} alt="alert" />
                        <p className="absolute top-[-10px] right-[-10px] text-[14px] text-white text-center font-medium bg-red-500 w-[20px] h-[20px] rounded-[50px]">
                            9
                        </p>
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

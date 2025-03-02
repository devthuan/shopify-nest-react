import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import images from '~/assets/images';
import { NavLink } from 'react-router';

const cx = classNames.bind(styles);

const Sidebar = () => {
    // Danh sách menu
    const listMenu = [
        {
            group: 'services',
            items: [
                {
                    title: 'Dashboard',
                    icon: images.dashboardIcon,
                    link: '/dashboard',
                },
                {
                    title: 'Product',
                    icon: images.dashboardIcon,
                    link: '/manage-product',
                },
                {
                    title: 'Order',
                    icon: images.dashboardIcon,
                    link: '/orders',
                },
                {
                    title: 'Contact',
                    icon: images.dashboardIcon,
                    link: '/contact',
                },
            ],
        },
        {
            group: 'systems',
            items: [
                {
                    title: 'Settings',
                    icon: images.dashboardIcon,
                    link: '/settings',
                },
                {
                    title: 'Logout',
                    icon: images.dashboardIcon,
                    link: '/logout',
                },
            ],
        },
    ];

    const renderMenu = (item, index) => {
        return (
            <NavLink key={index} to={item.link}>
                {({ isActive }) => (
                    <div className="w-[240px] h-[50px] relative border-none">
                        <div className="w-[240px] h-[50px] left-0 top-0 absolute bg-white"></div>
                        <div
                            className={`w-auto h-[50px] left-[25px] right-[20px] absolute text-[14px] flex pl-[15px] gap-[16px] items-center rounded-[10px] 
                                ${
                                    (isActive ? 'shadow-[0px_12px_84px_0px_rgba(83,83,83,0.21)]' : '',
                                    isActive ? 'bg-[#4880ff] text-white' : 'bg-white text-[#202224]')
                                }`}
                        >
                            <img
                                src={item.icon}
                                alt="Logo"
                                className={`w-[22px] h-auto rounded-full 
                                    ${isActive ? '' : 'bg-[#202224]'}`}
                            />
                            <p className={cx('text__style')}>{item.title}</p>
                        </div>
                        <div
                            className={`w-[9px] h-[50px] left-[-5px] top-0 absolute rounded-[10px]  
                            ${isActive ? 'bg-[#4880ff]' : 'bg-white'}`}
                        ></div>
                    </div>
                )}
            </NavLink>
        );
    };

    return (
        <div className={cx('min-h-[600px] h-full w-full flex flex-col items-center relative ')}>
            <div className="flex mt-[24px] mb-[30px]">
                <p className="text-[#4880FF] text-[20px] font-bold">Dash</p>
                <p className="text-[20px] font-bold">Stack</p>
            </div>
            <div className="w-full">
                {listMenu.map(
                    (group) => group.group === 'services' && group.items.map((item, index) => renderMenu(item, index)),
                )}
            </div>
            <div className="absolute pt-[16px]  bottom-[91px] border-t-[2px] border-[E0E0E0] w-full">
                {listMenu.map(
                    (group) => group.group === 'systems' && group.items.map((item, index) => renderMenu(item, index)),
                )}
            </div>
        </div>
    );
};

export default Sidebar;

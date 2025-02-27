import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';
import Product from './Product/Product';
import images from '~/assets/images';
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, BrowseCategoryIcon, EllipseProductIcon } from '../Icons';
import BrowseCategory from './BrowseCategory/BrowseCategory';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

const ListProduct = ({
    haveChangePage,
    haveViewAll,
    viewAllBtnSecondary = false,
    rowQuantity,
    isCateGory,
    rowBrowseCategoryQuantity,
    isInWishList,
    isForYou,
}) => {
    // fake data product
    const TOTAL_PRODUCT = 10;
    const productNames = [
        'HAVIT HV-G92 Gamepad',
        'AK-900 Wired Keyboard',
        'IPS LCD Gaming Monitor',
        'S-Series Comfort Chair',
        'Logitech MX Master 3',
        'Razer BlackShark V2',
        'HyperX Cloud II Wireless',
        "Samsung 27' 4K Monitor",
        'Corsair K95 RGB Platinum',
        'SteelSeries Rival 600',
    ];
    const getRandomSale = () => {
        const salePercents = [10, 20, 30, 40, 50]; // Các mức giảm giá hợp lý
        return salePercents[Math.floor(Math.random() * salePercents.length)];
    };
    const getRandomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const listProduct = Array.from({ length: TOTAL_PRODUCT }, (_, index) => {
        const sale = getRandomSale();
        const pricePre = getRandomPrice(100, 500); // Giá gốc từ $100 - $500
        const priceFinal = Math.round(pricePre * (1 - sale / 100)); // Giá sau giảm

        return {
            id: index + 1,
            sale: `-${sale}%`,
            image: images.anhSanPham,
            name: productNames[index % productNames.length],
            priceFinal: `$${priceFinal}`,
            pricePre: `$${pricePre}`,
        };
    });

    // fake data BrowseCategory
    const TOTAL_CATEGORY = 20;
    const browseCategoryNames = [
        'Smartphones',
        'Laptops',
        'Gaming',
        'PC',
        'Headphones',
        'Smart',
        'Cameras',
        'Drones',
        'VR Headsets',
        'Speakers',
    ];
    const listBrowseCategory = Array.from({ length: TOTAL_CATEGORY }, (_, index) => {
        return {
            id: index + 1,
            title: browseCategoryNames[index % browseCategoryNames.length],
            icon: <BrowseCategoryIcon />,
        };
    });
    console.log(listBrowseCategory);

    // PAGINATE !!!
    const itemsPerPage = isCateGory
        ? 6 * rowBrowseCategoryQuantity
        : 4 * (rowQuantity === 'infinite' ? Math.ceil(TOTAL_PRODUCT / 4) : rowQuantity);
    const totalItems = isCateGory ? TOTAL_CATEGORY : TOTAL_PRODUCT;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(0);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage === totalPages - 1 ? 0 : prevPage + 1));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage === 0 ? totalPages - 1 : prevPage - 1));
    };

    const startIndex = currentPage * itemsPerPage;
    const itemsToShow = isCateGory
        ? listBrowseCategory.slice(startIndex, startIndex + itemsPerPage)
        : listProduct.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className={cx('wrapper')}>
            {haveViewAll && (
                <Button primary={!viewAllBtnSecondary} secondary={viewAllBtnSecondary} className={cx('view-all')}>
                    {haveViewAll}
                </Button>
            )}
            {haveChangePage && (
                <div className={cx('change-wrapper')}>
                    <div className={cx('change-prev')} onClick={handlePrevPage}>
                        <EllipseProductIcon
                            fill={'#f5f5f5'}
                            className={cx('ellipse-icon')}
                            width="4.6rem"
                            height="4.6rem"
                        />
                        <ArrowLeftIcon className={cx('arrow-icon')} />
                    </div>

                    <div className={cx('change-next')} onClick={handleNextPage}>
                        <EllipseProductIcon
                            fill={'#f5f5f5'}
                            className={cx('ellipse-icon')}
                            width="4.6rem"
                            height="4.6rem"
                        />
                        <ArrowRightIcon className={cx('arrow-icon')} />
                    </div>
                </div>
            )}
            <div className={cx('container')}>
                {!isCateGory
                    ? itemsToShow.map((product, index) => (
                          <Product
                              key={product.id}
                              sale={product.sale}
                              image={product.image}
                              name={product.name}
                              priceFinal={product.priceFinal}
                              pricePre={product.pricePre}
                              isInWishList={isInWishList}
                              isForYou={isForYou}
                          />
                      ))
                    : itemsToShow.map((browseCategory, index) => (
                          <BrowseCategory
                              key={browseCategory.id}
                              title={browseCategory.title}
                              icon={browseCategory.icon}
                          />
                      ))}
            </div>
        </div>
    );
};

export default ListProduct;

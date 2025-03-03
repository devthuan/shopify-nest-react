import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';
import Product from './Product/Product';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, BrowseCategoryIcon, EllipseProductIcon } from '../Icons';
import BrowseCategory from './BrowseCategory/BrowseCategory';
import Button from '../Button/Button';
import { getProductByLimitAndPage } from '~/services/productApi';
import { getCategoryByLimitAndPage } from '~/services/categoryApi';

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
    const ITEMS_PER_PAGE = isCateGory ? 6 * rowBrowseCategoryQuantity : 4 * rowQuantity;
    const [listProduct, setListProduct] = useState([]);
    const [totalPagesProduct, setTotalPagesProduct] = useState(1);

    const [listBrowseCategory, setListBrowseCategory] = useState([]);
    const [totalPagesBrowseCategory, setTotalPagesBrowseCategory] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);
    // Call API
    useEffect(() => {
        isCateGory ? fetchDataBrowseCategory(currentPage) : fetchDataProduct(currentPage);
    }, [currentPage]);

    const fetchDataProduct = async (currentPage) => {
        const res = await getProductByLimitAndPage(ITEMS_PER_PAGE, currentPage);
        if (res) {
            console.log(res);
            handleListProductData(res.data);
            setTotalPagesProduct(res.totalPage);
        }
    };

    // Xu li data product
    const handleListProductData = (listProductRaw) => {
        const data = listProductRaw.map((product) => handleProductData(product));
        setListProduct(data);
    };

    const handleProductData = (product) => {
        const prices = product.variants.map((variant) => variant.price);
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images,
            lowestPrice: Math.min(...prices),
            highestPrice: Math.max(...prices),
        };
    };

    // Xu li data BrowseCategory
    const fetchDataBrowseCategory = async (currentPage) => {
        const res = await getCategoryByLimitAndPage(ITEMS_PER_PAGE, currentPage);
        if (res) {
            setListBrowseCategory(res.data);
            setTotalPagesBrowseCategory(res.totalPage);
        }
    };

    const handleNextPage = () => {
        if (isCateGory) {
            setCurrentPage((prevPage) => (prevPage === totalPagesBrowseCategory ? 1 : prevPage + 1));
        } else {
            console.log(totalPagesProduct);
            setCurrentPage((prevPage) => (prevPage === totalPagesProduct ? 1 : prevPage + 1));
        }
    };

    const handlePrevPage = () => {
        if (isCateGory) setCurrentPage((prevPage) => (prevPage === 1 ? totalPagesBrowseCategory : prevPage - 1));
        else setCurrentPage((prevPage) => (prevPage === 1 ? totalPagesProduct : prevPage - 1));
    };

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
                    ? listProduct.map((product) => (
                          <Product
                              key={product.id}
                              image={product.images[0]}
                              name={product.name}
                              priceFrom={product.lowestPrice}
                              priceTo={product.highestPrice}
                              isInWishList={isInWishList}
                              isForYou={isForYou}
                          />
                      ))
                    : listBrowseCategory.map((category) => (
                          <BrowseCategory key={category.id} title={category.name} icon={<BrowseCategoryIcon />} />
                      ))}
            </div>
        </div>
    );
};

export default ListProduct;

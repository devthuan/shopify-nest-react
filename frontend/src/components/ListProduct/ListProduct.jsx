import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';
import Product from './Product/Product';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, BrowseCategoryIcon, EllipseProductIcon } from '../Icons';
import BrowseCategory from './BrowseCategory/BrowseCategory';
import Button from '../Button/Button';
import { getProductByLimitAndPage } from '~/services/productApi';
import { getCategoryByLimitAndPage } from '~/services/categoryApi';
import { useNavigate } from 'react-router';

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
    const navigate = useNavigate();
    const ITEMS_PER_PAGE = useMemo(
        () => (isCateGory ? 6 * rowBrowseCategoryQuantity : 4 * rowQuantity),
        [isCateGory, rowQuantity, rowBrowseCategoryQuantity],
    );

    const [dataList, setDataList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch data từ API
    const fetchData = useCallback(
        async (page) => {
            const fetchFunction = isCateGory ? getCategoryByLimitAndPage : getProductByLimitAndPage;
            const res = await fetchFunction(ITEMS_PER_PAGE, page);
            if (res) {
                setDataList(isCateGory ? res.data : res.data.map(handleProductData));
                setTotalPages(res.totalPage);
            }
        },
        [ITEMS_PER_PAGE, isCateGory],
    );

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);

    const handleProductData = (product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        lowestPrice: Math.min(...product.variants.map((v) => v.price)),
        highestPrice: Math.max(...product.variants.map((v) => v.price)),
    });

    const changePage = (next) => {
        setCurrentPage((prev) => (next ? (prev === totalPages ? 1 : prev + 1) : prev === 1 ? totalPages : prev - 1));
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
                    <div className={cx('change-prev')} onClick={() => changePage(false)}>
                        <EllipseProductIcon
                            fill={'#f5f5f5'}
                            className={cx('ellipse-icon')}
                            width="4.6rem"
                            height="4.6rem"
                        />
                        <ArrowLeftIcon className={cx('arrow-icon')} />
                    </div>
                    <div className={cx('change-next')} onClick={() => changePage(true)}>
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
                {isCateGory
                    ? dataList.map((category) => (
                          <BrowseCategory key={category.id} title={category.name} icon={<BrowseCategoryIcon />} />
                      ))
                    : dataList.map((product) => (
                          <Product
                              key={product.id}
                              image={product.images[0]}
                              name={product.name}
                              priceFrom={product.lowestPrice}
                              priceTo={product.highestPrice}
                              isInWishList={isInWishList}
                              isForYou={isForYou}
                              goToProductDetail={() => navigate(`/product/${product.id}`)}
                          />
                      ))}
            </div>
        </div>
    );
};

export default ListProduct;

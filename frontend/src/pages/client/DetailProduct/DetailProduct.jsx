import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import images from '~/assets/images';
import {
    DeliveryIcon,
    EllipseIcon,
    HeartIcon,
    MinusIcon,
    PlusIcon,
    ReturnIcon,
    StarFullProductIcon,
} from '~/components/Icons';
import Line from '~/components/Line/Line';
import Button from '~/components/Button/Button';
import TrendingProducts from '~/components/TrendingProducts/TrendingProducts';
import { useParams } from 'react-router';
import { getProductById } from '~/services/productApi';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    const [listSize, setListSize] = useState([]);
    const [listColor, setListColor] = useState([]);

    const [colorSelected, setColorSelected] = useState('');
    const [sizeSelected, setSizeSelected] = useState('');
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        if (product.variants) {
            handleGetListSize(product);
            handleGetListColour(product);
        }
    }, [product]);

    const fetchProduct = async () => {
        const res = await getProductById(id);
        if (res) {
            setProduct(res);
            console.log(res);
        }
    };

    const handleGetListSize = (productObject) => {
        const sizes = productObject.variants
            .map((varItem) => varItem.attributes.find((attribute) => attribute.attributeName === 'Size'))
            .filter((sizeItem) => sizeItem) // Loại bỏ giá trị undefined
            .map((sizeItem) => ({
                id: sizeItem.id,
                name: sizeItem.attributeValue,
            }));

        // Loại bỏ các phần tử trùng lặp
        const uniqueSizes = Array.from(new Map(sizes.map((item) => [item.name, item])).values());

        setListSize(uniqueSizes);
    };

    const handleGetListColour = (productObject) => {
        const color = productObject.variants
            .map((varItem) => varItem.attributes.find((attribute) => attribute.attributeName === 'Màu sắc'))
            .filter((colourItem) => colourItem) // Loại bỏ giá trị undefined
            .map((colorItem) => ({
                id: colorItem.id,
                name: colorItem.attributeValue,
            }));

        // Loại bỏ các phần tử trùng lặp
        const uniqueColor = Array.from(new Map(color.map((item) => [item.name, item])).values());

        setListColor(uniqueColor);
    };

    const handleSelectSize = (size) => {
        setSizeSelected(size.name);

        // Nếu kích thước bị disable, bỏ disable tất cả kích thước và cập nhật lại màu sắc
        if (size.disable) {
            setListSize((prevListSize) => prevListSize.map((item) => ({ ...item, disable: false })));
            setColorSelected('');
        }

        // Lấy danh sách các màu có thể chọn dựa trên size đã chọn
        const availableColorNames = new Set(
            product.variants
                .filter((variant) =>
                    variant.attributes.some(
                        (attribute) => attribute.attributeName === 'Size' && attribute.attributeValue === size.name,
                    ),
                )
                .map((variant) => variant.attributes.find((attribute) => attribute.attributeName === 'Màu sắc'))
                .filter(Boolean)
                .map((colorItem) => colorItem.attributeValue),
        );

        const updatedColors = listColor.map((color) => ({
            ...color,
            disable: !availableColorNames.has(color.name),
        }));

        setListColor(updatedColors);
    };

    const handleSelectColor = (color) => {
        setColorSelected(color.name);

        if (color.disable) {
            setListColor((prevListColor) => prevListColor.map((item) => ({ ...item, disable: false })));
            setSizeSelected('');
        }

        const availableSizeNames = new Set(
            product.variants
                .filter((variant) =>
                    variant.attributes.some(
                        (attribute) => attribute.attributeName === 'Màu sắc' && attribute.attributeValue === color.name,
                    ),
                )
                .map((variant) => variant.attributes.find((attribute) => attribute.attributeName === 'Size'))
                .filter(Boolean)
                .map((sizeItem) => sizeItem.attributeValue),
        );

        const updatedSizes = listSize.map((size) => ({
            ...size,
            disable: !availableSizeNames.has(size.name),
        }));

        setListSize(updatedSizes);
    };

    // Kiểm tra với stock hiện có
    const handleIncreaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleChangeQuantity = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* todo: tao component road-map */}
                <div className={cx('road-map', 'mt-[80px] mb-[80px]')}></div>
                <div className={cx('content')}>
                    <div className={cx('left-images')}>
                        <div className={cx('images-select')}>
                            <div className={cx('image-select')}>
                                <img src={images.detailProductImageSelect1} alt="image" />
                            </div>
                            <div className={cx('image-select')}>
                                <img src={images.detailProductImageSelect2} alt="image" />
                            </div>
                            <div className={cx('image-select')}>
                                <img src={images.detailProductImageSelect1} alt="image" />
                            </div>
                            <div className={cx('image-select')}>
                                <img src={images.detailProductImageSelect2} alt="image" />
                            </div>
                        </div>
                        <div className={cx('image-view')}>
                            <img src={images.detailProductImageSelect1} alt="image" />
                        </div>
                    </div>
                    <div className={cx('right-description', 'relative')}>
                        <div className={cx('name')}>{product.name}</div>
                        <div className={cx('rate', 'mt-[16px]')}>
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                            <StarFullProductIcon />
                        </div>
                        <div className={cx('price', 'mt-[16px]')}>{product.price}</div>
                        <div className={cx('description', 'mt-[24px] mb-[24px]')}>
                            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble
                            free install & mess free removal Pressure sensitive.
                        </div>
                        <div className="relative">
                            <Line />
                        </div>
                        <div className={cx('color', 'pt-[24px]')}>
                            <span>Colours:</span>
                            <span className={cx('colors-picker')}>
                                {listColor.map((color) => (
                                    <span key={color.id} onClick={() => handleSelectColor(color)}>
                                        <EllipseIcon
                                            className={cx('color-picker-item', {
                                                'color-picker-item-selected': color.name === colorSelected,
                                                disable: color.disable,
                                            })}
                                            width="2rem"
                                            height="2rem"
                                            fill={color.name}
                                        />
                                    </span>
                                ))}
                            </span>
                        </div>
                        <div className={cx('size', 'mt-[24px]')}>
                            <span>Size: </span>
                            <span className={cx('sizes-picker')}>
                                {listSize.map((size) => (
                                    <div
                                        key={`size-${size.id}`}
                                        className={cx('size-picker-item', {
                                            'product-selected': size.name === sizeSelected,
                                            disable: size.disable,
                                        })}
                                        onClick={() => handleSelectSize(size)}
                                    >
                                        {size.name}
                                    </div>
                                ))}
                            </span>
                        </div>
                        <div className={cx('footer', 'mt-[24px] mb-[40px]')}>
                            <div className={cx('quantity-interaction')}>
                                <span className={cx('decrease')} onClick={handleDecreaseQuantity}>
                                    <MinusIcon />
                                </span>
                                <input
                                    value={quantity}
                                    type="number"
                                    className={cx('quantity')}
                                    onChange={handleChangeQuantity}
                                />
                                <span className={cx('increase')} onClick={handleIncreaseQuantity}>
                                    <PlusIcon />
                                </span>
                            </div>
                            <Button primary small className={cx('btn-buy')}>
                                Buy Now
                            </Button>
                            <div className={cx('add-to-wishlist')}>
                                <HeartIcon />
                            </div>
                        </div>
                        <div className={cx('delivery-method')}>
                            <div className={cx('item')}>
                                <div className={cx('left')}>
                                    <DeliveryIcon />
                                </div>
                                <div className={cx('right')}>
                                    <span>Free Delivery</span>
                                    <a href="#">Enter your postal code for Delivery Availability</a>
                                </div>
                            </div>

                            <div className={cx('item')}>
                                <div className={cx('left')}>
                                    <ReturnIcon />
                                </div>
                                <div className={cx('right')}>
                                    <span>Return Delivery</span>
                                    <span>
                                        Free 30 Days Delivery Returns. <a href="#">Details</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TrendingProducts
                    topTitle={"Today's"}
                    heading={'Flash Sales'}
                    rowQuantity={1}
                    className="mb-[140px] mt-[140px]"
                />
            </div>
        </div>
    );
};

export default DetailProduct;

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
import { toast } from 'react-toastify';
import { addProductToCart } from '~/services/cartApi';

const cx = classNames.bind(styles);

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    const [listSize, setListSize] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [listImage, setListImage] = useState([]);

    const [imageSelected, setImageSelected] = useState('');
    const [colorSelected, setColorSelected] = useState('');
    const [sizeSelected, setSizeSelected] = useState('');
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const res = await getProductById(id);
        if (res) {
            setProduct(res);
        }
    };

    useEffect(() => {
        if (product.variants) {
            handleGetListSize(product);
            handleGetListColour(product);
            handleGetListImage(product);
        }
    }, [product]);

    useEffect(() => {
        if (listImage.length > 0) {
            setImageSelected(listImage[0]); // Ảnh mặc định là ảnh đầu tiên
        }
    }, [listImage]);

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

    const handleGetListImage = (productObject) => {
        setListImage(productObject.images);
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

    // Todo: Ảnh trùng tên nhau thì vẫn hiện viền đỏ.
    const handleSelectImage = (image) => {
        if (image !== imageSelected) {
            setImageSelected(image);
        }
    };

    const handleAddToCart = async () => {
        // validate
        if (!colorSelected || !sizeSelected || !quantity) {
            toast.error('Dữ liệu không hợp lệ!');
            return;
        }

        // console.log(colorSelected, sizeSelected, quantity);

        // Tìm variant phù hợp với màu sắc và size
        const selectedVariant = product.variants.find(
            (variant) =>
                variant.attributes.some(
                    (attr) => attr.attributeName === 'Màu sắc' && attr.attributeValue === colorSelected,
                ) &&
                variant.attributes.some(
                    (attr) => attr.attributeName === 'Size' && attr.attributeValue === sizeSelected,
                ),
        );

        if (!selectedVariant) {
            toast.error('Không tìm thấy sản phẩm với màu sắc và kích thước đã chọn.');
            return;
        }

        // Kiểm tra hàng còn hay hết
        if (selectedVariant.stock < quantity) {
            toast.error(`Sản phẩm vượt quá số lượng trong kho. (còn ${selectedVariant.stock} sản phẩm)`);
            return;
        }

        const res = await addProductToCart(selectedVariant.id, quantity);

        if (res && res.status >= 200 && res.status < 300) {
            toast.success(res.data.message);
        } else {
            toast.error(res.data?.message);
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
                            {listImage.map((image, index) => (
                                <div
                                    key={`image-${index}`}
                                    className={cx('image-select', {
                                        'image-selected': image === imageSelected,
                                    })}
                                    onClick={() => handleSelectImage(image)}
                                >
                                    <img src={image} alt="image" />
                                </div>
                            ))}
                        </div>
                        <div className={cx('image-view')}>
                            <img src={imageSelected} alt="image" />
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
                        <div className={cx('description', 'mt-[24px] mb-[24px]')}>{product.description}</div>
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
                            <Button onClick={() => handleAddToCart()} primary small className={cx('btn-buy')}>
                                Add To Cart
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

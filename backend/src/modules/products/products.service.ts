import { RedisService } from './../redis/redis.service';
import { VariantsService } from './../variants/variants.service';
import { AttributesService } from './../attributes/attributes.service';
import { Injectable, NotFoundException, Delete, BadRequestException } from '@nestjs/common';
import { CreateProductDto, VariantDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseService } from 'src/common/base.service';
import { Products } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { CommonException } from 'src/common/exception';
import { CategoriesService } from '../categories/categories.service';
import { Attributes } from '../attributes/entities/attribute.entity';
import { AttributeValues } from '../attribute_values/entities/attribute_value.entity';
import { Variants } from '../variants/entities/variants.entity';
import { VariantAttributeValues } from '../variant-attribute-values/entities/variant-attribute-value.entity';
import { ProductImages } from '../product_images/entities/product_image.entity';

@Injectable()
export class ProductsService extends BaseService<Products> {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,

    @InjectRepository(ProductImages)
    private readonly productImagesRepository: Repository<ProductImages>,
    
    @InjectRepository(Attributes)
    private readonly attributesRepository: Repository<Attributes>,
    
    @InjectRepository(AttributeValues)
    private readonly attributeValuesRepository: Repository<AttributeValues>,
  
    
    @InjectRepository(Variants)
    private readonly variantsRepository: Repository<Variants>,
    
    @InjectRepository(VariantAttributeValues)
    private readonly variantAttributeValuesRepository: Repository<VariantAttributeValues>,
  

    private readonly dataSource : DataSource,
    private readonly redisService: RedisService,
    private readonly categoryService: CategoriesService,
    private readonly attributeService: AttributesService,

  ){
    super(productsRepository);
  }


    
  async createProduct(createProductDto: CreateProductDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const checkExistingCategory = await this.categoryService.findOne(createProductDto.categoryId);
      if (!checkExistingCategory) {
        throw new NotFoundException("Danh mục sản phẩm không tồn tại");
      }

      const productInitial = this.generateCode(createProductDto.name)  
       
      const newProduct = this.productsRepository.create({
        name: createProductDto.name,
        description: createProductDto.description,
        category: await this.categoryService.findOne(createProductDto.categoryId),
      });
      await queryRunner.manager.save(newProduct);


      // create images
      if(createProductDto.images){
        createProductDto.images.map(img => {
          const newImage = this.productImagesRepository.create({
            products: newProduct,
            urlImages: img
          })
          queryRunner.manager.save(newImage)
        })
      }


      // Create variants
      for(const variant of createProductDto.variants){
       
        const attributeCodes: string[] = [];
        for(const attr of variant.attributes){

          const attributeNameCode = this.generateCode(attr.attributeName)
          const attributeValueCode = this.generateCode(attr.attributeValue)
           

          attributeCodes.push(`${attributeNameCode}-${attributeValueCode}`);

        }
        
        const sku = `${productInitial}-${attributeCodes}`
        const newVariant = this.variantsRepository.create({
          sku,
          products: newProduct,
          price: variant.price,
          stock: variant.stock
        })
        await queryRunner.manager.save(newVariant)
        

        for(const attr of variant.attributes){
          
          let attribute = await  this.attributeService.findOneByName(attr.attributeName)
          if(!attribute){
            attribute =  this.attributesRepository.create({name: attr.attributeName })
            await queryRunner.manager.save(attribute)
          }

          let attributeValue = this.attributeValuesRepository.create({
            value: attr.attributeValue,
            attributes: attribute
          })
          await queryRunner.manager.save(attributeValue)

          let variantAttributeValue = this.variantAttributeValuesRepository.create({
            variant: newVariant,
            attributeValues: attributeValue
          })
          await queryRunner.manager.save(variantAttributeValue)
          
        }
        

      }

      await queryRunner.commitTransaction();



      return {
        statusCode: 201,
        message: "Tạo sản phẩm thành công",
        data: newProduct,
      };

    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction();
      CommonException.handle(error);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllProduct(
    search: string,
      page : number = 1,
      limit : number = 10,
      sortBy : string = 'createdAt',
      sortOrder: 'ASC' | 'DESC' = 'ASC',
      filters: Record<string, any> = {} // Nhận filters từ controller
  ): Promise<{ total: number;  currentPage: number; totalPage: number; limit : number; data: any[]}>{
    try {

      // check caching
      const cacheProducts = await this.redisService.get(`products_limit=${limit}_page=${page}`);

      if (cacheProducts) {
        console.log("data from cache")
        return typeof cacheProducts === 'string' ? JSON.parse(cacheProducts) : cacheProducts;
      }
      
      
      const queryBuilder = await this.productsRepository.createQueryBuilder('products')
        .leftJoinAndSelect('products.images', 'product_images')
        .leftJoinAndSelect('products.variants', 'variants')
        .leftJoinAndSelect('variants.variantAttributeValues', 'variantAttributeValues')
        .leftJoinAndSelect('variantAttributeValues.attributeValues', 'attributeValues')
        .leftJoinAndSelect('attributeValues.attributes', 'attributes')
        .where('variants.deletedAt IS NULL')
        .select([
          'products.id',
          'products.name',
          'products.description',
          'products.createdAt',
          'product_images.urlImages',
          'variants.id',
          'variants.sku',
          'variants.price',
          'variants.stock',
          'variantAttributeValues.id',
          'attributeValues.value',
          'attributes.name'
        ])

         // count total
          const total = await queryBuilder.getCount();
          const totalPage = Math.ceil(total / limit);
         // pagination page
          const data = await queryBuilder
            .skip((page - 1) * limit) // Bỏ qua các bản ghi đã được hiển thị
            .take(limit) // Giới hạn số bản ghi trả về
            .orderBy(`products.${sortBy}`, sortOrder) // Sắp xếp theo trường chỉ định
            .getMany(); // Lấy danh sách bản ghi

          const formattedData = data.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images.map(image => image.urlImages),
            variants: product.variants.map(variant => ({
              sku: variant.sku,
              id: variant.id,
              price: variant.price,
              stock: variant.stock,
              attributes: variant.variantAttributeValues.map(vav => ({
                id: vav.id,
                attributeName: vav.attributeValues.attributes.name,
                attributeValue: vav.attributeValues.value
              }))
            }))
          }))

        
        const response = { total, totalPage, currentPage: +page, limit: +limit, data: formattedData };

        // save data in cache
        await this.redisService.set(
          `products_limit=${limit}_page=${page}`,
          JSON.stringify(response),
          60
        )

        return {
          total,
          totalPage,
          currentPage: +page,
          limit: +limit,
          data: formattedData
      }

      

    } catch (error) {
      console.log(error)
      CommonException.handle(error)
    }
  }

  async getProductById(productId: string): Promise<any> {
    try {
        const queryBuilder = await this.productsRepository.createQueryBuilder('products')
          .leftJoinAndSelect('products.images', 'product_images')
          .leftJoinAndSelect('products.variants', 'variants')
          .leftJoinAndSelect('variants.variantAttributeValues', 'variantAttributeValues')
          .leftJoinAndSelect('variantAttributeValues.attributeValues', 'attributeValues')
          .leftJoinAndSelect('attributeValues.attributes', 'attributes')
          .where('variants.deletedAt IS NULL')
          .andWhere('products.deletedAt IS NULL')
          .select([
            'products.id',
            'products.name',
            'products.description',
            'products.createdAt',
            'product_images.urlImages',
            'variants.id',
            'variants.sku',
            'variants.price',
            'variants.stock',
            'variantAttributeValues.id',
            'attributeValues.value',
            'attributes.name'
          ])
          .andWhere('products.id = :id', {id: productId})
          .getOne();

          if(!queryBuilder) {
            throw new NotFoundException("Sản phẩm không tồn tại!")
          }


            const formattedData = {
              id: queryBuilder.id,
              name: queryBuilder.name,
              description: queryBuilder.description,
              createdAt: queryBuilder.createdAt,
              images: queryBuilder.images.map(image => image.urlImages),
              variants: queryBuilder.variants.map(variant => ({
                sku: variant.sku,
                id: variant.id,
                price: variant.price,
                stock: variant.stock,
                attributes: variant.variantAttributeValues.map(vav => ({
                  id: vav.id,
                  attributeName: vav.attributeValues.attributes.name,
                  attributeValue: vav.attributeValues.value
                }))
              }))
            }


          return formattedData

        

    } catch (error) {
      CommonException.handle(error)
    }
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner()
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const existingProduct = await this.productsRepository.findOne({
        where: {id : productId},
        relations: ['category', 'images', 'variants', 'variants.variantAttributeValues']
      });

      if(!existingProduct){
        throw new NotFoundException("Sản phẩm không tồn tại");
      }

      // update information product
      if(updateProductDto.name){
        existingProduct.name = updateProductDto.name;
      }
      if(updateProductDto.description){
        existingProduct.description = updateProductDto.description;
      }
      
      if(updateProductDto.categoryId){
        existingProduct.category = await this.categoryService.findOne(updateProductDto.categoryId);
      }

      await queryRunner.manager.save(existingProduct);

      // update images
      if(updateProductDto.images){

        await queryRunner.manager.delete(ProductImages, {products: existingProduct});

        // add new images
        for(const img of updateProductDto.images){
          const newImage = this.productImagesRepository.create({
            products: existingProduct,
            urlImages: img
          })
          await queryRunner.manager.save(newImage)
        }
      }

      // update information variants and attribute
      for(const variant of updateProductDto.variants){

        //1 remove variant not found in request
        // Xóa mềm các biến thể không có trong request
        const variantsToDelete = existingProduct.variants.filter(
          (existingVariant) =>
            !updateProductDto.variants.some((variant) => variant.id === existingVariant.id)
        );

        for (const variantToDelete of variantsToDelete) {
          variantToDelete.deletedAt = new Date();
          await queryRunner.manager.save(variantToDelete);

        }

        // xoá mềm các thuộc tính không có trong request
        for(const existingVariant of existingProduct.variants){
          const existingAttribute = existingVariant.variantAttributeValues
        
          const attributesToDelete = existingAttribute.filter(
            (existingAttr) => !variant.attributes.some((vav) => vav.id !== existingAttr.id)
          )

          // Xóa mềm các thuộc tính không có trong request
          for (const attributeToDelete of attributesToDelete) {
            attributeToDelete.deletedAt = new Date();
            await queryRunner.manager.save(attributeToDelete);
          }

        }

        // cập nhật hoặc thêm mới các biến thể và thuộc tính
        const variantToUpdate = existingProduct.variants.find((existingVariant) => existingVariant.id === variant.id)

        if(variantToUpdate) {
          variantToUpdate.price = variant.price
          variantToUpdate.stock = variant.stock
          variantToUpdate.updatedAt = new Date()
          
          await queryRunner.manager.save(variantToUpdate)
          
          // cập nhật thuộc tính mới
          for(const attr of variant.attributes){
             const existingAttributeValue = variantToUpdate.variantAttributeValues.find(
              (vav) =>
                vav.attributeValues.attributes.name === attr.attributeName &&
                vav.attributeValues.value === attr.attributeValue
            );
             if (existingAttributeValue) {
              // Cập nhật thuộc tính hiện có
              existingAttributeValue.attributeValues.value = attr.attributeValue;
              existingAttributeValue.attributeValues.updatedAt = new Date();
              await queryRunner.manager.save(existingAttributeValue.attributeValues);
            } else {
              // Thêm mới thuộc tính
              let attribute = await this.attributesRepository.findOne({
                where: { name: attr.attributeName },
              });
  
              if (!attribute) {
                attribute = this.attributesRepository.create({ name: attr.attributeName });
                await queryRunner.manager.save(attribute);
              }
  
              const attributeValue = this.attributeValuesRepository.create({
                value: attr.attributeValue,
                attributes: attribute,
              });
              await queryRunner.manager.save(attributeValue);
  
              const variantAttributeValue = this.variantAttributeValuesRepository.create({
                variant: variantToUpdate,
                attributeValues: attributeValue,
              });
              await queryRunner.manager.save(variantAttributeValue);
            }
          }

        } else {
          await this.createVariantAndAttribute(variant, existingProduct, queryRunner);
        }


      }
      
      
      existingProduct.updatedAt = new Date();

      await queryRunner.commitTransaction();

      return {
        statusCode: 200,
        message: "Cập nhật sản phẩm thành công",
        data: existingProduct
      }
      
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      CommonException.handle(error)
    } finally {
      await queryRunner.release()
    }
  }


  async createVariantAndAttribute(variant: VariantDto, product: Products, queryRunner: QueryRunner) {
  // Tạo SKU dựa trên tên sản phẩm và mã thuộc tính
  const attributeCodes: string[] = [];
  for (const attr of variant.attributes) {
    const attributeNameCode = this.generateCode(attr.attributeName);
    const attributeValueCode = this.generateCode(attr.attributeValue);
    attributeCodes.push(`${attributeNameCode}-${attributeValueCode}`);
  }
  const sku = `${product.name}-${attributeCodes.join('-')}`;

  // Tạo mới biến thể
  const newVariant = this.variantsRepository.create({
    price: variant.price,
    stock: variant.stock,
    sku: sku,
    products: product,
  });
  await queryRunner.manager.save(newVariant);

  // Xử lý các thuộc tính của biến thể
  for (const attribute of variant.attributes) {
    // Kiểm tra xem thuộc tính đã tồn tại chưa
    let existingAttribute = await this.attributesRepository.findOne({
      where: { name: attribute.attributeName },
    });

    // Nếu thuộc tính chưa tồn tại, tạo mới
    if (!existingAttribute) {
      existingAttribute = this.attributesRepository.create({
        name: attribute.attributeName,
      });
      await queryRunner.manager.save(existingAttribute);
    }

    // Tạo giá trị thuộc tính
    const newAttributeValue = this.attributeValuesRepository.create({
      value: attribute.attributeValue, // Sửa lại từ `attribute.name` thành `attribute.attributeValue`
      attributes: existingAttribute,
    });
    await queryRunner.manager.save(newAttributeValue);

    // Liên kết giá trị thuộc tính với biến thể
    const newVariantAttributeValue = this.variantAttributeValuesRepository.create({
      attributeValues: newAttributeValue,
      variant: newVariant,
    });
    await queryRunner.manager.save(newVariantAttributeValue);
  }
  }



  generateCode(text: string) {
      const removeVietnameseAccents = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
      };

      return removeVietnameseAccents(text)  
        .split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join("")
  }

  async checkExistingProductAttribute(productAttributeId: string): Promise<Variants> {

    try {
      
      const productAttribute = await this.variantsRepository.createQueryBuilder('variants')
        .leftJoinAndSelect('variants.products', 'products')
        .leftJoinAndSelect('products.discounts', 'discounts')
        .where('variants.id = :id', { id: productAttributeId })
        .andWhere('variants.deletedAt IS NULL')
        .getOne();

      if(!productAttribute) {
        throw new NotFoundException('Biến thể sản phẩm không tồn tại');
      }

      if(productAttribute.stock === 0){
        throw new BadRequestException('Biến thể sản phẩm đã hết hàng');
      }
      
     
     
      
      return productAttribute;

      
    } catch (error) {
      CommonException.handle(error);
    }
  }

   async checkExistingProductAttributeNotQuantity(productAttributeId: string): Promise<Variants> {

    try {
      
      const productAttribute = await this.variantsRepository.createQueryBuilder('productAttributes')
        .leftJoinAndSelect('productAttributes.products', 'products')
        .leftJoinAndSelect('products.productDiscount', 'productDiscount')
        .where('productAttributes.id = :id', { id: productAttributeId })
        .andWhere('productAttributes.deletedAt IS NULL')
        .getOne();

      if(!productAttribute) {
        throw new NotFoundException('Product attribute not found');
      }
      return productAttribute;

      
    } catch (error) {
      CommonException.handle(error);
    }
  }

 
 

}

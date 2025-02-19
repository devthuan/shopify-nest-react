import { VariantsService } from './../variants/variants.service';
import { AttributesService } from './../attributes/attributes.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
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

@Injectable()
export class ProductsService extends BaseService<Products> {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    
    @InjectRepository(Attributes)
    private readonly attributesRepository: Repository<Attributes>,
    
    @InjectRepository(AttributeValues)
    private readonly attributeValuesRepository: Repository<AttributeValues>,
  
    
    @InjectRepository(Variants)
    private readonly variantsRepository: Repository<Variants>,
    
    @InjectRepository(VariantAttributeValues)
    private readonly variantAttributeValuesRepository: Repository<VariantAttributeValues>,
  

    private readonly dataSource : DataSource,
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

      // Create variants
      for(const variant of createProductDto.variants){
       
        const attributeCodes: string[] = [];
        for(const attr of variant.attribute){

          const attributeNameCode = this.generateCode(attr.name)
          const attributeValueCode = this.generateCode(attr.attributeValue)
           

          attributeCodes.push(`${attributeNameCode}-${attributeValueCode}`);

        }
        
        const sku = `${productInitial}-${attributeCodes}`
        const newVariant = this.variantsRepository.create({
          sku,
          product: newProduct,
          price: variant.price,
          stock: variant.stock
        })
        await queryRunner.manager.save(newVariant)
        

        for(const attr of variant.attribute){
          
          let attribute = await  this.attributeService.findOneByName(attr.name)
          if(!attribute){
            attribute =  this.attributesRepository.create({name: attr.name })
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

  async getAllProduct(): Promise<any>{
    try {
      const queryBuilder = this.productsRepository.createQueryBuilder('products')
        .leftJoinAndSelect('products.variants', 'variants')
        .leftJoinAndSelect('variants.variantAttributeValues', 'variantAttributeValues')
        .leftJoinAndSelect('variantAttributeValues.attributeValues', 'attributeValues')
        .leftJoinAndSelect('attributeValues.attributes', 'attributes')
        .getMany();

        return queryBuilder
    //   // const product = await this.productsRepository
    //   // .createQueryBuilder('products')
    //   // .leftJoinAndSelect('products.variants', 'variants')
    //   // .leftJoinAndSelect('variants.variantAttributeValues', 'variantAttributeValues')
    //   // .leftJoinAndSelect('variantAttributeValues.attributeValues', 'attributeValues')
    //   // .leftJoinAndSelect('attributeValues.attributes', 'attributes')
    //   // .getMany(); // Or getMany() if you expect multiple results

    // return product;

    } catch (error) {
      CommonException.handle(error)
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

 

}

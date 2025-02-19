import { DeepPartial, Repository } from 'typeorm';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CommonException } from './exception';
import { BaseEntity } from './base.entity';

export class BaseService<T extends BaseEntity> {
  constructor(
    
    private readonly repository: Repository<T>, 
  ) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    try {
      if(createDto['name'] ){
        
        const queryBuilder = this.repository.createQueryBuilder('entity')
          if (createDto['name']) {
            queryBuilder.where('entity.name = :name', { name: createDto['name'] })
          }

          if (createDto['code']) {
            queryBuilder.orWhere('entity.code = :code', { code: createDto['code'] })
          }
          
          if (createDto['codeName']) {
            queryBuilder.orWhere('entity.codeName = :codeName', { codeName: createDto['codeName'] })
          }
          
          if (createDto['guardName']) {
            queryBuilder.orWhere('entity.guardName = :guardName', { guardName: createDto['guardName'] })
          }

          queryBuilder.andWhere('entity.deletedAt is null')
          
          const existingEntity = await queryBuilder.getOne()
        
        if(existingEntity) {
          throw new ConflictException('Tên hoặc mã đã tồn tại')
        }
  
      }
      
      const entity = this.repository.create(createDto);
      return await this.repository.save(entity);
       
    } catch (error) {
      CommonException.handle(error)
    }
  }

  async findAll(
      search: string,
      page : number = 1,
      limit : number = 10,
      sortBy : string = 'createdAt',
      sortOrder: 'ASC' | 'DESC' = 'ASC',
      filters: Record<string, any> = {} // Nhận filters từ controller
    ): Promise<{ total: number;  currentPage: number; totalPage: number; limit : number; data: T[]}> 
    { 
    try {
        const queryBuilder = this.repository.createQueryBuilder('entity')
    
          .where('entity.deletedAt IS NULL')

          if (search) {
            queryBuilder.andWhere('entity.name LIKE :search', { search: `%${search}%` });
          }

           // Filter conditions
            Object.keys(filters).forEach((key) => {
              if (filters[key] !== undefined && filters[key] !== null) {
                let value = filters[key];
                
                // Chuyển đổi giá trị 'true' hoặc 'false' thành boolean
                if (value === 'true') value = true;
                if (value === 'false') value = false;

                queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
              }
            });

          // count total
          const total = await queryBuilder.getCount();

         // pagination page
          const data = await queryBuilder
            .skip((page - 1) * limit) // Bỏ qua các bản ghi đã được hiển thị
            .take(limit) // Giới hạn số bản ghi trả về
            .orderBy(`entity.${sortBy}`, sortOrder) // Sắp xếp theo trường chỉ định
            .getMany(); // Lấy danh sách bản ghi


      const totalPage = Math.ceil(total / limit);

      return {
        total,
        totalPage,
        currentPage: +page,
        limit: +limit,
        data
      }
    } catch (error) {
      CommonException.handle(error)
    }
  }

  async findAllDeleted(
      search: string,
      page : number = 1,
      limit : number = 10,
      sortBy : string = 'createdAt',
      sortOrder: 'ASC' | 'DESC' = 'ASC',
      filters: Record<string, any> = {} // Nhận filters từ controller
    ): Promise<{ message: string; total: number;  currentPage: number; totalPage: number; limit : number; data: T[]}> 
    { 
    try {
        const queryBuilder = this.repository.createQueryBuilder('entity')
          .where('entity.deletedAt IS NOT NULL')

          if (search) {
            queryBuilder.andWhere('entity.name LIKE :search', { search: `%${search}%` });
          }

           // Filter conditions
          Object.keys(filters).forEach((key) => {
            if (filters[key] !== undefined && filters[key] !== null) {
              queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: filters[key] });
            }
          });

          // count total
          const total = await queryBuilder.getCount();

         // pagination page
          const data = await queryBuilder
            .skip((page - 1) * limit) // Bỏ qua các bản ghi đã được hiển thị
            .take(limit) // Giới hạn số bản ghi trả về
            .orderBy(`entity.${sortBy}`, sortOrder) // Sắp xếp theo trường chỉ định
            .getMany(); // Lấy danh sách bản ghi


      const totalPage = Math.ceil(total / limit);

      return {
        message: 'Danh sách dữ liệu đã xoá',
        total,
        totalPage,
        currentPage: +page,
        limit: +limit,
        data
      }
    } catch (error) {
      CommonException.handle(error)
    }
  }

  async findOne(id: string): Promise<T> {
  try {
     const entityName = this.repository.target instanceof Function 
      ? this.repository.target.name 
      : this.repository.target;

      const data = await this.repository.createQueryBuilder('entity')
        .where('entity.id = :id', { id }) // Kiểm tra ID
        .andWhere('entity.deletedAt IS NULL') // Kiểm tra deletedAt là null
        .getOne();

      if (!data) {
        throw new NotFoundException(`${entityName} không tồn tại`);
      }

      return data;
    } catch (error) {
      CommonException.handle(error)
    }
  }
  async findOneByName(name: string): Promise<T> {
  try {
     const entityName = this.repository.target instanceof Function 
      ? this.repository.target.name 
      : this.repository.target;

      const data = await this.repository.createQueryBuilder('entity')
        .where('entity.name = :name', { name }) // Kiểm tra ID
        .andWhere('entity.deletedAt IS NULL') // Kiểm tra deletedAt là null
        .getOne();

    
      return data;
    } catch (error) {
      CommonException.handle(error)
    }
  }

  async update(id: string, partialEntity: QueryDeepPartialEntity<T>) :Promise<any> {
    try {
      const findData = await this.repository.createQueryBuilder('entity')
        .where('entity.id = :id', {id})
        .andWhere('entity.deletedAt is null')
        .getOne()

      if(!findData){
        throw new NotFoundException('Dữ liệu không tồn tại')
      }

      if(partialEntity['name']) {
      
      const queryBuilder = this.repository.createQueryBuilder('entity')
        if (partialEntity['name']) {
          queryBuilder.where('entity.name = :name', { name: partialEntity['name'] })
        }
        if (partialEntity['code']) {
          queryBuilder.orWhere('entity.code = :code', { code: partialEntity['code'] })
        }
        queryBuilder.andWhere('entity.deletedAt is null')

        const existingEntity = await queryBuilder.getOne();

      if(existingEntity ) {
        
        throw new ConflictException('Tên hoặc mã đã tồn tại')
      }
    }
    // Thêm updatedAt vào partialEntity với ép kiểu
    (partialEntity as any).updatedAt = new Date();

    const {affected } = await this.repository.update(id, partialEntity);
    if(affected > 0) {
        return {message: 'Cập nhật thành công.'}
      
      }else {
          throw new BadRequestException()
        }

    } catch (error) {
      CommonException.handle(error)
    }
  }

  async deleteSoft(id: string): Promise<object> {
    try {
      const entityName = this.repository.target instanceof Function 
      ? this.repository.target.name 
      : this.repository.target;

      const data = await this.repository.createQueryBuilder('entity')
      .where('entity.id = :id', {id})
      .andWhere('entity.deletedAt IS NULL')
      .getOne();

      if (!data) {
        throw new NotFoundException('Dữ liệu không tồn tại')
      }
      
      data.deletedAt = new Date();
      await this.repository.save(data);

      return { message: `Xoá ${entityName} thành công.` }


    } catch (error) {
      CommonException.handle(error)
    }
  }

  async recover(id: string): Promise<object> {
    try {
      const entityName = this.repository.target instanceof Function 
      ? this.repository.target.name 
      : this.repository.target;

      const data = await this.repository.createQueryBuilder('entity')
        .where('entity.id = :id', {id})
        .andWhere('entity.deletedAt is not null')
        .getOne();
      
        if(!data) {
          throw new NotFoundException('Dữ liệu không tồn tại')
        }
        
        data.deletedAt = null
        await this.repository.save(data);
        return {message: `khôi phục ${entityName} thành công.`}
    } catch (error) {
      CommonException.handle(error)
    }
  }

  async checkExisting(data: { name?: string; code?: string; id?: string }): Promise<boolean> {
    try {
      const query =  this.repository.createQueryBuilder('entity')
      .where('entity.deletedAt is null');
      if (data.name) {
        query.andWhere('entity.name = :name ', { name: data.name})
      }
      if(data.code) {
        query.andWhere('entity.code = :code ', { code: data.code})
      }
      if(data.id) {
        query.andWhere('entity.id!= :id ', { id: data.id})
      }
      // Nếu cả name và code đều không có giá trị thì sẽ không trả về kết quả hợp lệ
      if (!data.name && !data.code && !data.code) {
        return false;
      }
      const check = await query.getOne();
       
       return!!check;
    } catch (error) {
      CommonException.handle(error)
      return false;
    }
  }
  
  async checkExistingCommon(data: { column?: string, value: string,  id?: string }): Promise<boolean> {
    try {
      const query =  this.repository.createQueryBuilder('entity')
      .where('entity.deletedAt is null');
      if (data.column) {
        query.andWhere(`entity.${data.column} = :value `, { value: data.value})
      }
      
    
      const check = await query.getOne();
       
       return!!check;
    } catch (error) {
      CommonException.handle(error)
      return false;
    }
  }
}
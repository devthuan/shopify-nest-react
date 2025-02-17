import { Test, TestingModule } from '@nestjs/testing';
import { VariantAttributesController } from './variant_attributes.controller';
import { VariantAttributesService } from './variant_attributes.service';

describe('VariantAttributesController', () => {
  let controller: VariantAttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantAttributesController],
      providers: [VariantAttributesService],
    }).compile();

    controller = module.get<VariantAttributesController>(VariantAttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

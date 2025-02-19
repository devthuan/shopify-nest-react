import { Test, TestingModule } from '@nestjs/testing';
import { VariantAttributeValuesController } from './variant-attribute-values.controller';
import { VariantAttributeValuesService } from './variant-attribute-values.service';

describe('VariantAttributeValuesController', () => {
  let controller: VariantAttributeValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantAttributeValuesController],
      providers: [VariantAttributeValuesService],
    }).compile();

    controller = module.get<VariantAttributeValuesController>(VariantAttributeValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

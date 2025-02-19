import { Test, TestingModule } from '@nestjs/testing';
import { VariantAttributeValuesService } from './variant-attribute-values.service';

describe('VariantAttributeValuesService', () => {
  let service: VariantAttributeValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantAttributeValuesService],
    }).compile();

    service = module.get<VariantAttributeValuesService>(VariantAttributeValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

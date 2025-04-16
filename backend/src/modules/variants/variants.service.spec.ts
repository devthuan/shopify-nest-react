import { Test, TestingModule } from '@nestjs/testing';
import { VariantsService } from './variants.service';
  describe('VariantsService', () => {
  let service: VariantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantsService],
    }).compile();

    service = module.get<VariantsService>(VariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return not found", async () => {
    const result = await service.findOne("1")
    expect(result).toEqual({id: 1, name: "abc"})

  })

});

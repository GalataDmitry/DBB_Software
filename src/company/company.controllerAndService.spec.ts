import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

describe('CompanyControllerAndService', () => {
  let module: TestingModule;
  let controller: CompanyController;
  let service: CompanyService;

  const mockCompanyService = {
    getSalaryData: (name: string) => {
      if (name === '0') {
        return 'All main staff salary: 3714.4$';
      } else return 'John: 530$';
    },
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [{ provide: CompanyService, useValue: mockCompanyService }],
    }).compile();

    controller = await module.get<CompanyController>(CompanyController);
    service = await module.get<CompanyService>(CompanyService);

  });

  it('should be defined controller and called with param', async () => {
    const getSalaryDataController = jest.spyOn(controller, 'getSalaryData');
    expect(await controller.getSalaryData('0')).toBeDefined();
    expect(getSalaryDataController).toHaveBeenCalledWith('0');
  });

  it('should be defined service and called with different params', async () => {
    expect(service.getSalaryData('0')).toBeDefined()
    const getSalaryDataService = jest.spyOn(service, 'getSalaryData');
    expect(await service.getSalaryData('0')).toBe('All main staff salary: 3714.4$');
    expect(getSalaryDataService).toHaveBeenCalledWith('0');
    expect(await service.getSalaryData('John')).toBe('John: 530$');
    expect(getSalaryDataService).toHaveBeenCalledWith('John');
  });
});

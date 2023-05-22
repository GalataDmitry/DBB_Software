import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

describe('CompanyController', () => {
  let module: TestingModule;
  let controller: CompanyController;
  let service: CompanyService;

  const mockCompanyService = {
    getSalaryData: (name: string) => {
      console.log('-->', name);
      return 3;
    },
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [CompanyController],
      // providers: [ CompanyService], //, {provide: CompanyService, useFactory:() => {}}
      // providers: [ CompanyServiceProvider],
      providers: [{ provide: CompanyService, useValue: mockCompanyService }],
    }).compile();

    controller = await module.get<CompanyController>(CompanyController);
    service = await module.get<CompanyService>(CompanyService);
  });

  it('should be defined', async () => {
    // const test = jest.spyOn(FakeClass, 'getSalaryData').mockImplementation(() => 'Hi')
    // const getSalaryData = (arg: string) =>
    // jest.spyOn(service, 'getSalaryData').mockImplementation(async () => '')
    // getSalaryData('012')
    const getSalaryDataController = jest.spyOn(controller, 'getSalaryData')
    expect(controller.getSalaryData('0')).toBeDefined()
    expect(getSalaryDataController).toHaveBeenCalledWith('0')
    expect(await service.getSalaryData('kkk')).toBe(3);
    const getSalaryDataService = jest.spyOn(service, 'getSalaryData');
    await service.getSalaryData('000');
    expect(getSalaryDataService).toHaveBeenCalled();
  });
});

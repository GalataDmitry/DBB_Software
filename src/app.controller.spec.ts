import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import exp from 'constants';


// describe('AppController', () => {
//   let controller: AppController;
//   let service: AppService;
//
//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [
//         AppService,
//         {
//           provide: AppService,
//           useFactory: () => ({
//             getAllMembersSalaryData: jest.fn(async () => 'All members salary'),
//             getOneMemberSalaryDataByName: jest.fn(async (name: string) => `${name}: 1000$`),
//           }),
//         },
//       ],
//     }).compile();
//     controller = moduleRef.get<AppController>(AppController);
//     service = moduleRef.get<AppService>(AppService);
//   });
//   describe('Services and controller', () => {
//     it('should be define controller and service', () => {
//       expect(controller).toBeDefined();
//       expect(service).toBeDefined();
//     });
//     it('should be define methods', async () => {
//       expect(await controller.getAllMembersSalaryData()).toBeDefined();
//       expect(await controller.getOneMemberSalaryDataByName('John')).toBeDefined();
//     });
//     it('check return value', async () => {
//       const name = 'John';
//       expect(await controller.getAllMembersSalaryData()).toEqual('All members salary');
//       const result = await controller.getOneMemberSalaryDataByName(name);
//       expect(await controller.getOneMemberSalaryDataByName(name)).toBe(result);
//     })
//     it('have been called methods', async () => {
//       const name = 'John';
//       await controller.getOneMemberSalaryDataByName(name);
//       await controller.getAllMembersSalaryData();
//       const mockGetOneMemberSalaryDataByName = (arg) => jest.spyOn(service, 'getOneMemberSalaryDataByName')
//       expect(mockGetOneMemberSalaryDataByName(name)).toHaveBeenCalledWith(name);
//       const mockGetAllMembersSalaryData = () => jest.spyOn(service, 'getAllMembersSalaryData')
//       expect(mockGetAllMembersSalaryData()).toHaveBeenCalled()
//     });
//   });
// });
describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  class FakeClass {
    // static getAllMembersSalaryData() {
    //   jest.fn(async () => 'Value');
    // }
    static async getAllMembersSalaryData() {
      return 'Value';
    }


    static getOneMemberSalaryDataByName() {
      jest.fn(async (name: string) => Promise<void> );
    }
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: AppService, useClass: FakeClass }],
    }).compile();
    controller = moduleRef.get<AppController>(AppController);
    service = moduleRef.get<AppService>(AppService);
  });
  describe('Services and controller', () => {
    it('should be define controller and service', async () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
      const spy = jest.spyOn(FakeClass, 'getAllMembersSalaryData').mockReturnValue('')
      expect(FakeClass.getAllMembersSalaryData).toBeDefined();
    });
  });
});

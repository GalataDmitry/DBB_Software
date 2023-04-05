import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/get_salary_by_name/:name')
  getOneMemberSalaryDataByName(@Param('name') name: string) {
    return this.appService.getOneMemberSalaryDataByName(name);
  }

  @Get('/get_all_salary')
  getAllMembersSalaryData() {
    return this.appService.getAllMembersSalaryData();
  }
}

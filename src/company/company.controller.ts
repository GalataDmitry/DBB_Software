import { Controller, Get, Param } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {

  constructor(private readonly companyService: CompanyService) {
  }

  @Get('/get_salary_data/:name')
  async getSalaryData(@Param('name') name: string) {
    return await this.companyService.getSalaryData(name);
  }
}

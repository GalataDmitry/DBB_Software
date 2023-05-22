import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MainStaff } from '../schemas/main_staff.model';
import { SubStaff } from '../schemas/sub_staff.model';
import { MainStaffSubStaff } from '../schemas/main_staff_sub_staff.model';

@Module({
  imports: [
    SequelizeModule.forFeature([MainStaff, SubStaff, MainStaffSubStaff]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { MainStaff } from './schemas/main_staff.model';
import { SubStaff } from './schemas/sub_staff.model';
import { MainStaffSubStaff } from './schemas/main_staff_sub_staff.model';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.txt',
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './company.db',
      autoLoadModels: true,
      define: {
        timestamps: false,
        freezeTableName: true,
      },
      models: [MainStaff, SubStaff, MainStaffSubStaff],
    }),
    CompanyModule,
  ],
})

export class MainModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MainStaff } from './schemas/main_staff.model';
import { SubStaff } from './schemas/sub_staff.model';
import { MainStaffSubStaff } from './schemas/main_staff_sub_staff.model';
import { ConfigModule } from '@nestjs/config';

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
    SequelizeModule.forFeature([MainStaff, SubStaff, MainStaffSubStaff]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

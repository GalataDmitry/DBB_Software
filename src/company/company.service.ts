import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MainStaff } from '../schemas/main_staff.model';
import { SubStaff } from '../schemas/sub_staff.model';
import { Context, GetAllMembersSalaryData, GetOneMemberSalaryDataByName } from '../auxiliary_entities/Context';

@Injectable()
export class CompanyService {

  constructor(
    @InjectModel(MainStaff)
    private MainStaffModel: typeof MainStaff,
  ) {}

  async getSalaryData(name: string) {

    if (name !== '0') {
      const company_member = await this.MainStaffModel.findOne({
        where: { name },
        include: SubStaff,
      });
      const getSalaryData = new Context(new GetOneMemberSalaryDataByName(company_member));
      return getSalaryData.toCompute();
    } else {
      const company_members = await this.MainStaffModel.findAll({
        include: SubStaff,
      });
      const getAllSalaryData = new Context();
      getAllSalaryData.setStrategy(new GetAllMembersSalaryData(company_members));
      return getAllSalaryData.toCompute();
    }
  }
}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MainStaff } from './schemas/main_staff.model';
import { SubStaff } from './schemas/sub_staff.model';
import { AuxContext, GetAllMembersSalaryData, GetOneMemberSalaryDataByName } from './auxiliary_functions/AuxContext';


@Injectable()
export class AppService {
  constructor(
    @InjectModel(MainStaff)
    private MainStaffModel: typeof MainStaff,
  ) {
  }

  async getOneMemberSalaryDataByName(name) {

    const company_member = await this.MainStaffModel.findOne({
      where: { name },
      include: SubStaff,
    });
    const getSalaryData = new AuxContext(new GetOneMemberSalaryDataByName(company_member))
    return getSalaryData.toCompute()
  }

  async getAllMembersSalaryData() {

    const company_members = await this.MainStaffModel.findAll({
      include: SubStaff,
    });
    const getAllSalaryData = new AuxContext(new GetAllMembersSalaryData(company_members))
    return getAllSalaryData.toCompute()
  }
}

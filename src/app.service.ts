import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MainStaff } from './schemas/main_staff.model';
import {
  defineSalaryWithYearsBonuses,
  defineSubStaffBonuses,
  getBaseMembersData,
} from './auxiliary_functions/auxiliary_functions';
import { SubStaff } from './schemas/sub_staff.model';

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

    if (company_member) {

      const { name, position_in_company, base_salary, number_of_years_worked } = getBaseMembersData(company_member);

      if (position_in_company === 'employee') {

        const total_salary = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.03, 0.3);
        return `${name}: ${total_salary}$`;

      } else if (position_in_company === 'manager') {

        const salary_with_years_bonuses = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.05, 0.4);
        const total_salary = defineSubStaffBonuses(company_member.sub_staff, salary_with_years_bonuses, 0.005);
        return `${name}: ${total_salary}$`;

      } else if (position_in_company === 'sales') {

        const salary_with_years_bonuses = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.01, 0.35);
        const total_salary = defineSubStaffBonuses(company_member.sub_staff, salary_with_years_bonuses, 0.003);
        return `${name}: ${total_salary}$`;

      }
    } else return 'Unknown person';
  }

  async getAllMembersSalaryData() {

    let all_main_staff_total_salary = 0;
    const company_members = await this.MainStaffModel.findAll({
      include: SubStaff,
    });

    for (let i = 0; i < company_members.length; i++) {

      const { name, position_in_company, base_salary, number_of_years_worked } = getBaseMembersData(company_members[i]);

      if (position_in_company === 'employee') {

        const total_salary = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.03, 0.3);
        all_main_staff_total_salary += total_salary;

      } else if (position_in_company === 'manager') {

        let salary_with_years_bonuses = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.05, 0.4);
        const total_salary = defineSubStaffBonuses(company_members[i].sub_staff, salary_with_years_bonuses, 0.005);
        all_main_staff_total_salary += total_salary;

      } else if (position_in_company === 'sales') {

        let salary_with_years_bonuses = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.01, 0.35);
        const total_salary = defineSubStaffBonuses(company_members[i].sub_staff, salary_with_years_bonuses, 0.003);
        all_main_staff_total_salary += total_salary;

      }
    }
    return `All main staff salary: ${all_main_staff_total_salary.toFixed(1)}$`;
  }
}

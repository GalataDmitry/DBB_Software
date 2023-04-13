import { MainStaff } from '../schemas/main_staff.model';
import { defineSalaryWithYearsBonuses, defineSubStaffBonuses, getBaseMembersData } from './auxiliary_functions';

interface Strategy {
  company_member?: MainStaff;
  company_members?: MainStaff[];
  algorithm(): string;
}

export class GetOneMemberSalaryDataByName implements Strategy {

  readonly company_member: MainStaff;

  constructor(company_member: MainStaff) {
    this.company_member = company_member;
  }

  algorithm(): string {

    if (this.company_member) {

      const {
        name,
        position_in_company,
        base_salary,
        number_of_years_worked,
      } = getBaseMembersData(this.company_member);

      if (position_in_company === 'employee') {

        const total_salary = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.03, 0.3);
        return `${name}: ${total_salary}$`;

      } else if (position_in_company === 'manager') {

        const salary_with_years_bonuses = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.05, 0.4);
        const total_salary = defineSubStaffBonuses(this.company_member.sub_staff, salary_with_years_bonuses, 0.005);
        return `${name}: ${total_salary}$`;

      } else if (position_in_company === 'sales') {

        const salary_with_years_bonuses = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.01, 0.35);
        const total_salary = defineSubStaffBonuses(this.company_member.sub_staff, salary_with_years_bonuses, 0.003);
        return `${name}: ${total_salary}$`;

      }
    } else return 'Unknown person';
  }
}

export class GetAllMembersSalaryData implements Strategy {

  readonly company_members: MainStaff[];

  constructor(company_members: MainStaff[]) {
    this.company_members = company_members;
  }

  algorithm(): string {

    let all_main_staff_total_salary = 0;

    for (let i = 0; i < this.company_members.length; i++) {

      const {
        name,
        position_in_company,
        base_salary,
        number_of_years_worked,
      } = getBaseMembersData(this.company_members[i]);

      if (position_in_company === 'employee') {

        const total_salary = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.03, 0.3);
        all_main_staff_total_salary += total_salary;

      } else if (position_in_company === 'manager') {

        let salary_with_years_bonuses = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.05, 0.4);
        const total_salary = defineSubStaffBonuses(this.company_members[i].sub_staff, salary_with_years_bonuses, 0.005);
        all_main_staff_total_salary += total_salary;

      } else if (position_in_company === 'sales') {

        let salary_with_years_bonuses = defineSalaryWithYearsBonuses(name, base_salary, number_of_years_worked, 0.01, 0.35);
        const total_salary = defineSubStaffBonuses(this.company_members[i].sub_staff, salary_with_years_bonuses, 0.003);
        all_main_staff_total_salary += total_salary;

      }
    }
    return `All main staff salary: ${all_main_staff_total_salary.toFixed(1)}$`;
  }
}

export class AuxContext {

  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public toCompute(): string {
    return this.strategy.algorithm();
  }

}
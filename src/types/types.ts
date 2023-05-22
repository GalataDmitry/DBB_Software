import { SubStaff } from '../schemas/sub_staff.model';
import { MainStaff } from '../schemas/main_staff.model';

export interface SubBonusesParamsTypes {
  (
    sub_staff_array: SubStaff[],
    salary_with_years_bonuses: number,
    percent_from_sub_staff: number,
  ): number
}

export interface defineSalaryWithYearsBonusesParamsTypes {
  (
    name: string,
    base_salary: number,
    number_of_years_worked: number,
    year_bonus_percent: number,
    limit_percent: number,
  ): number
}

export interface Strategy {
  company_member?: MainStaff;
  company_members?: MainStaff[];

  algorithm(): string;
}

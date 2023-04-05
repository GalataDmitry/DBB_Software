import { defineSalaryWithYearsBonusesParamsTypes, SubBonusesParamsTypes } from '../types/types';
import { MainStaff } from '../schemas/main_staff.model';

export const defineSalaryWithYearsBonuses: defineSalaryWithYearsBonusesParamsTypes =
  (
    name,
    base_salary,
    number_of_years_worked,
    year_bonus_percent,
    limit_percent,
  ) => {
    const bonus_for_one_year = base_salary * year_bonus_percent;
    const bonus_limit = base_salary * limit_percent;
    const bonuses_for_all_years = +number_of_years_worked * bonus_for_one_year;

    if (bonuses_for_all_years <= bonus_limit) return base_salary + bonuses_for_all_years;
    else return base_salary + bonus_limit;
  };

export const defineSubStaffBonuses: SubBonusesParamsTypes =
  (
    sub_staff_array,
    salary_with_years_bonuses,
    percent_from_sub_staff,
  ) => {
    let total_salary;
    for (let i = 0; i < sub_staff_array.length; i++) {
      total_salary = salary_with_years_bonuses += sub_staff_array[i].salary * percent_from_sub_staff;
    }
    return total_salary;
  };

export const getBaseMembersData = (company_member: MainStaff) => {

  const name = company_member.name;
  const position_in_company = company_member.position;
  const base_salary = company_member.base_salary;
  const started_to_work_date = new Date(company_member.started_to_work).getTime();
  const current_date = new Date().getTime();
  const diff = current_date - started_to_work_date;
  const number_of_years_worked = (diff / 31536000000).toFixed(0);

  return {
    name,
    position_in_company,
    base_salary,
    number_of_years_worked,
  };
};
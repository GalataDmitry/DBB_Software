import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { SubStaff } from './sub_staff.model';
import { MainStaffSubStaff } from './main_staff_sub_staff.model';

@Table
export class MainStaff extends Model {
  @Column
  name: string
  @Column
  position: string
  @Column
  base_salary: number
  @Column
  started_to_work: string
  @BelongsToMany(() => SubStaff, () => MainStaffSubStaff, 'supervisor_id')
  sub_staff: SubStaff[]
}
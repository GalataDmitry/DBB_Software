import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MainStaff } from './main_staff.model';
import { SubStaff } from './sub_staff.model';

@Table
export class MainStaffSubStaff extends Model {
  @ForeignKey(() => MainStaff)
  @Column
  supervisor_id: number

  @ForeignKey(() => SubStaff)
  @Column
  subordinate_id: number
}
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class SubStaff extends Model {
  @Column
  name: string;
  @Column
  skill_level: string;
  @Column
  salary: number;
}
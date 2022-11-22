import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  public name: string;

  @Column('varchar', { length: 500, unique: true })
  public sku: string;
}

export default ProductEntity;

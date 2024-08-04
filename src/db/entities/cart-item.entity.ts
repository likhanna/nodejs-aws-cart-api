import { Column, Entity, JoinColumn, ManyToOne, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

import { CartEntity } from './cart.entity';

@Entity('cart_items')
export class CartItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ name: 'count', type: 'integer' })
  count!: number;

  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  @ManyToOne(() => CartEntity, (cart) => cart.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    orphanedRowAction: 'delete',
  })
  cart: CartEntity;
}

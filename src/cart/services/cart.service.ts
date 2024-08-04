import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart, CartStatuses } from '../models';
import { CartEntity } from 'src/db/entities';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async findByUserId(userId: string) {
    console.log('+++ findByUserId userId', userId);
    const foundedCart: CartEntity | null = await this.cartRepository.findOne({
      where: { userId },
      relations: {
        items: true,
      },
    });

    console.log('+++ foundedCart', foundedCart);

    return foundedCart;
  }

  async createByUserId(userId: string) {
    const userCart = {
      userId,
      items: [],
      status: CartStatuses.OPEN,
    };

    const newCart = this.cartRepository.save(userCart);

    return newCart;
  }

  async findOrCreateByUserId(userId: string) {
    console.log('+++ findOrCreateByUserId userId', userId);
    const foundedCart = await this.findByUserId(userId);

    if (foundedCart) {
      return foundedCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart) {
    console.log('+++ updateByUserId updateByUserId, items', userId, items);
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    await this.cartRepository.update(id, updatedCart);

    return updatedCart as unknown as CartEntity;
  }

  async removeByUserId(userId: string): Promise<void> {
    console.log('+++ removeByUserId userId', userId);
    await this.cartRepository.delete({ userId });
  }
}

import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart): number {
  console.log('+++ calculateCartTotal cart', cart);
  return 0;
  // cart
  //   ? cart.items.reduce((acc: number, { product: { price }, count }: CartItem) => {
  //       return (acc += price * count);
  //     }, 0)
  //   : 0;
}

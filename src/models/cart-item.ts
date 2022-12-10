import type { Product } from './product';

export interface CartItem {
	product_id: string;
	product_price: number;
	count: number;
}

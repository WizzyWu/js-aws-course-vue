<template>
	<v-list subheader>
		<v-list-item v-for="cart in cartItems" :key="cart.product_id" class="px-0">
			<v-list-item-avatar size="inherit">
				<v-add-product-to-cart
					:isEditable="isEditable"
					:initialCount="cart.count"
					@increment="handleProductIncrement(getProductById(cart.product_id))"
					@decrement="handleProductDecrement(cart.product_id)"
				></v-add-product-to-cart>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title v-text="getProductById(cart.product_id).title" ></v-list-item-title>

				<v-list-item-subtitle
					v-text="getProductById(cart.product_id).description"
				></v-list-item-subtitle>
			</v-list-item-content>

			<v-list-item-action>
				<v-list-item-title class="body2">
					{{ formatPrice(cart.product_price) }}
					x
					{{ cart.count }}

					=
					{{ formatPrice(cart.count * cart.product_price) }}
				</v-list-item-title>
			</v-list-item-action>
		</v-list-item>

		<v-list-item class="px-0">
			<v-list-item-content>
				<v-list-item-title>
					{{ $t('cart.shippingAddress') }}
				</v-list-item-title>
			</v-list-item-content>

			<v-list-item-action>
				<v-list-item-title class="body2 font-weight-bold">
					{{ $t('common.free') }}
				</v-list-item-title>
			</v-list-item-action>
		</v-list-item>

		<v-divider />

		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="text-h5">
					{{ $t('common.total') }}
				</v-list-item-title>
			</v-list-item-content>

			<v-list-item-action>
				<p class="text-h5">
					<v-catch-attention :value="formatPrice(totalCartAmount)" />
				</p>
			</v-list-item-action>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { formatter as priceFormatter } from '@/libs/price';
import { CartItem } from '@/models/cart-item';
import { Product } from '@/models/product';
import { productApi } from '@/api/product-api';

import { VAddProductToCart } from '@/components/AddProductToCart';
import VCatchAttention from '@/components/Animation/CatchAttention.vue';

const sum = (total: number, item: CartItem) => {
	return item.count * item.product_price + total;
};

export default Vue.extend({
	name: 'CartList',
	props: {
		cartItems: Array as PropType<CartItem[]>,
		isEditable: Boolean,
	},
	computed: {
		totalCartAmount() {
			return this.cartItems.reduce(sum, 0);
		},
	},
	data () {
		return {
			products: [] as Product[],
			isFetching: false,
		};
	},
	created() {
		this.fetchProducts();
	},
	methods: {
		getProductById (productId: string): Product {
			return this.products.filter(product => product.id === productId).pop() || { id: '', title: '', description: '', author: '', img: '', price: 0, count: 0 };
		},
		fetchProducts() {
			this.isFetching = true;

			productApi
				.fetchAvailableProducts()
				.then(products => {
					this.products = products;
					console.log('products', this.products);
				})
				.finally(() => {
					this.isFetching = false;
				});
		},
		formatPrice(price: number) {
			return priceFormatter.number(price);
		},
		handleProductIncrement(product: Product) {
			this.$store.dispatch('cart/addProductToCart', product);
		},

		handleProductDecrement(productId: string) {
			this.$store.dispatch('cart/removeProductFromCart', productId);
		},
	},
	components: { VAddProductToCart, VCatchAttention },
});
</script>

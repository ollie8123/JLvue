<template>
	<div class="product-edit-sidebar sticky-top">
		<nav
			id="productUpdateScrollspy"
			class="h-100 flex-column align-items-stretch"
		>
			<nav class="nav nav-pills flex-column">
				<div
					v-for="(info, key) in cardList"
					class="border-top"
				>
					<a
						class="nav-link icon-link icon-link-hover"
						:href="'#' + key"
						>{{ info }} <i class="bi bi-arrow-right"></i
					></a>
				</div>
			</nav>
		</nav>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const cardList = ref({
	productPageInfo: '商品頁面資訊',
	productSpecificationInfo: '商品規格資訊',
	logisticInfo: '物流資訊',
	otherInfo: '其他資訊',
});
</script>
<style scoped>

.product-edit-sidebar {
	height: 100%;
	width: 240px;
	color: rgb(55, 129, 194);
	background-color: aliceblue;
}
.nav-link:hover {
	color: rgb(34, 156, 34);
}

</style>

<template>
	<div class="page-flexbox">
		<div class="sidebar-container">
			<addProductsSideNav />
		</div>
		<div
			class="flex-fill"
			data-bs-smooth-scroll="true"
		>
			<section
				id="productPageInfo"
				class="card"
			>
				<div class="card-body">
					<h4 class="card-title">商品頁面資訊</h4>
				</div>
				<div class="card-body product-input-group">
					<div class="label-block">商品圖片</div>
					<div class="input-block"><multiImgUpload /></div>
				</div>
				<div class="card-body product-input-group">
					<div class="label-block">商品類別</div>
					<div class="input-block"><productCategorySelect /></div>
				</div>
			</section>
			<section
				id="productSpecificationInfo"
				class="card"
			>
				<div class="card-body">
					<h4 class="card-title">商品規格資訊</h4>
				</div>
				<img
					src="holder.js/100x180/"
					alt=""
				/>
				<div class="card-body">
					<p class="card-text">Text</p>
					<a
						href="#"
						class="card-link"
						>Link 1</a
					>
					<a
						href="#"
						class="card-link"
						>Link 2</a
					>
				</div>
			</section>
			<section
				id="logisticInfo"
				class="card m-3 shadow rounded"
			>
				<div class="card-body">
					<h4 class="card-title">物流資訊</h4>
				</div>
				<img
					src="holder.js/100x180/"
					alt=""
				/>
				<div class="card-body">
					<p class="card-text">Text</p>
					<a
						href="#"
						class="card-link"
						>Link 1</a
					>
					<a
						href="#"
						class="card-link"
						>Link 2</a
					>
				</div>
			</section>
			<section
				id="otherInfo"
				class="card m-3 shadow rounded"
			>
				<div class="card-body">
					<h4 class="card-title">其他</h4>
				</div>
				<img
					src="holder.js/100x180/"
					alt=""
				/>
				<div class="card-body">
					<p class="card-text">Text</p>
					<a
						href="#"
						class="card-link"
						>Link 1</a
					>
					<a
						href="#"
						class="card-link"
						>Link 2</a
					>
				</div>
			</section>
		</div>
	</div>
</template>
<script setup>
// import { ref } from 'vue';
import addProductsSideNav from './addProductsComponent/addProductsSideNav.vue';
import multiImgUpload from './addProductsComponent/multiImgUpload.vue';
import productCategorySelect from './addProductsComponent/productCategorySelect.vue'
</script>
<style scoped>
.page-flexbox {
	display: flex;
	height: 100%;
}
.sidebar-container {
	flex: 0 0 200px;
	background-color: lightblue;
}
.product-edit-sidebar {
	min-height: 100vh;
	position: sticky;
	top: 120px;
	width: 240px;
	color: rgb(55, 129, 194);
	background-color: aliceblue;
}
.card {
	scroll-margin-top: 110px;
	margin: 1rem !important;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
	border-radius: var(--bs-border-radius) !important;
}

.card-title {
	padding: 1rem !important;
}

.product-input-group {
	margin: 0.5rem !important;
	padding: 0.5rem !important;
	display: flex !important;
	flex-direction: row !important;
}

.label-block {
	display: flex;
	justify-content: end;
	width: 140px;
	padding: 0 5px;
	margin: 0 5px;
}

.input-block {
	position: relative;
	display: flex;
	justify-content: start;
	width: 100%;
	padding: 0 5px;
	margin: 0 5px;
}


</style>

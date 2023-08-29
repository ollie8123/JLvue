<template>
	<div class="product-main-header">
		<h1>
			{{ getParentRouteName() }} <i class="bi bi-caret-right-fill"></i>
			{{ $route.name }}
		</h1>
	</div>

	<div class="product-main-body"><router-view/></div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';

function getParentRouteName() {
	const matchedRoutes = useRoute().matched; //回傳一個陣列，包含所有上層的路由資訊
	const parentRoute = matchedRoutes[matchedRoutes.length - 2]; //長度-2必為上一層
	return parentRoute.name;
}
</script>

<style scoped>
.product-main-header {
	position: sticky;
	top: 65px;
	background-color: rgb(198, 227, 255);
	z-index: 2;
}
.product-main-header h1 {
	font-size: 30px;
	margin: 0 30px;
}
.product-main-body {
	position: relative;
	height: calc(100vh - 101px);
	/*測試用之後要砍*/
	/* height: 9000px; */
	width: 80%;
	margin: auto;
	
}
</style>

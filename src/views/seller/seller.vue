<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
		<div class="container-fluid">
			<ul class="navbar-nav">
				<li class="nav-item active">
					<RouterLink
						class="nav-link"
						to="/seller"
						>賣家中心</RouterLink
					>
				</li>
			</ul>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#main_nav"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div
				class="collapse navbar-collapse"
				id="main_nav"
			>
				<ul class="navbar-nav">
					<!-- <li class="nav-item">
						<a
							class="nav-link"
							href="#"
						>
							About
						</a> -->
					<!-- </li> -->
					<li class="nav-item dropdown">
						<RouterLink
							class="nav-link dropdown-toggle"
							data-bs-toggle="dropdown"
							to="/seller/order"
						>
							訂單管理
						</RouterLink>
						<ul class="dropdown-menu fade-up">
							<li>
								<RouterLink
									class="dropdown-item"
									to="/seller/order"
								>
									訂單1</RouterLink
								>
							</li>
							<li>
								<a
									class="dropdown-item"
									href="#"
								>
									訂單2
								</a>
							</li>
							<li>
								<a
									class="dropdown-item"
									href="#"
								>
									訂單3
								</a>
							</li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<RouterLink
							class="nav-link dropdown-toggle"
							data-bs-toggle="dropdown"
							to="/seller/management"
						>
							賣場管理
						</RouterLink>
						<ul class="dropdown-menu fade-up">
							<li>
								<a
									class="dropdown-item"
									href="#"
								>
									賣場1</a
								>
							</li>
							<li>
								<a
									class="dropdown-item"
									href="#"
								>
									賣場2
								</a>
							</li>
							<li>
								<a
									class="dropdown-item"
									href="#"
								>
									賣場3
								</a>
							</li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<RouterLink
							class="nav-link dropdown-toggle"
							data-bs-toggle="dropdown"
							to="/seller/product/myProducts"
						>
							商品管理
						</RouterLink>
						<ul class="dropdown-menu fade-up">
							<li>
								<RouterLink
									class="dropdown-item"
									to="/seller/product/myProducts"
								>
									我的商品</RouterLink
								>
							</li>
							<li>
								<RouterLink
									class="dropdown-item"
									to="/seller/product/addProducts"
								>
									新增商品
								</RouterLink>
							</li>
							<li>
								<a
									class="dropdown-item"
									href="#"
								>
									商品3
								</a>
							</li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<RouterLink
							class="nav-link dropdown-toggle"
							data-bs-toggle="dropdown"
							to="/seller/coupon/find"
						>
							優惠券管理
						</RouterLink>
						<ul class="dropdown-menu fade-up">
							<li>
								<RouterLink
									class="dropdown-item"
									to="/seller/coupon/find"
								>
									優惠券總覽</RouterLink
								>
							</li>
							<li>
								<RouterLink
									class="dropdown-item"
									to="/seller/coupon/insert"
								>
									優惠券新增</RouterLink
								>
							</li>
							<li>
								<RouterLink
									class="dropdown-item"
									to="/seller/coupon/insert"
								>
									優惠券圖表</RouterLink
								>
							</li>
						</ul>
					</li>
				</ul>
				
				<ul class="navbar-nav ms-auto">
					<!-- <li class="nav-item">
						<a
							class="nav-link"
							href="#"
						>
							Menu item
						</a>
					</li> -->
					<li class="nav-item active">
						<RouterLink
							class="nav-link"
							to="/"
							>離開賣家中心</RouterLink
						>
					</li>
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							data-bs-toggle="dropdown"
						>
							<img
								src="https://memeprod.ap-south-1.linodeobjects.com/user-template/6801449d868869578a0730d1f2acefed.png"
								alt="mdo"
								width="32"
								height="32"
								class="rounded-circle"
							/>
						</a>
						<ul class="dropdown-menu dropdown-menu-end fade-down">
							<li>
								<a
									class="dropdown-item"
									href="#"
								>
									會員資訊(未完成)</a
								>
							</li>
							<hr style="margin: 10px" />
							<li>
								<a
									class="dropdown-item"
									href="#"
								>
									登出(未完成)
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<!-- navbar-collapse.// -->
		</div>
		<!-- container-fluid.// -->
	</nav>

	<div class="seller-container">
		<RouterView />
	</div>
</template>

<script setup>
//========== Element Plus Css import ==========

import 'element-plus/es/components/base/style/css';
import 'element-plus/theme-chalk/el-input.css';
import 'element-plus/theme-chalk/el-scrollbar.css';
import 'element-plus/theme-chalk/el-button.css';
import 'element-plus/theme-chalk/el-form.css';
import 'element-plus/theme-chalk/el-form-item.css';

import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
@media all and (min-width: 992px) {
	.navbar .dropdown-menu-end {
		right: 0;
		left: auto;
	}
	.navbar .nav-item .dropdown-menu {
		display: block;
		opacity: 0;
		visibility: hidden;
		transition: 0.3s;
		margin-top: 0;
	}
	.navbar .nav-item:hover .nav-link {
		color: #fff;
	}
	.navbar .dropdown-menu.fade-down {
		top: 80%;
		transform: rotateX(-75deg);
		transform-origin: 0% 0%;
	}
	.navbar .dropdown-menu.fade-up {
		top: 180%;
	}
	.navbar .nav-item:hover .dropdown-menu {
		transition: 0.3s;
		opacity: 1;
		visibility: visible;
		top: 100%;
		transform: rotateX(0deg);
	}
}
nav {
	width: 100%;
	font-size: 20px;
}
.seller-container {
	position: sticky;
	margin-top: 65px;
}
.seller-container{
  position: sticky;
  margin-top: 65px;
}
</style>

<template>
	<div>
		<google-login :callback="callback" />
	</div>
</template>
<script setup>
import { decodeCredential } from 'vue3-google-login';
import { CookieAxios } from '../../../service/api';
const callback = async (response) => {
	await CookieAxios.post('/login/googleLogin', {

		googleMsg: decodeCredential(response.credential),
	}).then((rep) => {
		if (rep.data == 1) {
			alert('登入成功');
			localStorage.setItem('loggedIn', true);
			window.location.reload();
		} else {
			alert('登入失敗');
		}
	});
};
</script>
<style></style>

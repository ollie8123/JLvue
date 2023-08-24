<template>
  <div>
    <h1>個人資料</h1>
    <nav>
      <RouterLink to="/user/account/profile">個人檔案</RouterLink>
      <RouterLink to="/user/account/payment">銀行/信用卡</RouterLink>
      <RouterLink to="/user/account/address">地址</RouterLink>
    </nav>

    <RouterView></RouterView>
  </div>
</template>

<script>
export default {};
</script>

<style></style>

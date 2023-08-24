<template>

<div class="indexDiv">
  <IndexKindView></IndexKindView>
</div>

</template>

<script setup>
import IndexKindView from '../../components/index/IndexKindView.vue';
</script>

<style scoped>
.divBody {
  max-width: 1980px;
  margin: 0 15%;
  font-weight: normal;
  background-color: bisque;
}
nav {
  width: 100%;
  font-size: 30px;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

.indexDiv{
  min-height: 2000px;
}
</style>
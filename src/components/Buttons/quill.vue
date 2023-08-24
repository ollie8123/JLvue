<template>
  <div>
    <quill-editor
      ref="quillRef"
      :options="editorOptions"
    ></quill-editor>
    <button @click="showContent">顯示內容</button>
  </div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref ,watch } from "vue";
import { CookieAxios } from '../../service/api';

const editorOptions = ref({
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      ["image"],
    ],
  },
});

const quillRef = ref(null); 
const showContent = () => {
  if (quillRef.value) {
      const content = quillRef.value.getContents(); 
      const params = new URLSearchParams();
      params.append('aaa', JSON.stringify(content));

      CookieAxios.post('/public/testText',params).then(() => { 
      })
  }
};
</script>

<style></style>
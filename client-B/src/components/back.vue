<script setup>
import { watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Cookies from 'js-cookie'

const route = useRoute();
const router = useRouter();

watch(() => route.query, (val) => {
  console.log(val)
  if (val.identity && val.sid && val.name && val.redirect_url) {
    const { identity, sid, name, redirect_url } = val;
    console.log(val)
    Cookies.set("identity", identity, { expires: 1 })
    Cookies.set("sid", sid, { expires: 1 })
    Cookies.set("name", name, { expires: 1 })
    router.replace(redirect_url);
  }
}, {
  immediate: true,
  deep: true
})

</script>

<template>
  <div>
    登录中...
  </div>
</template>
  
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
  
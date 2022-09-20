<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, onMounted, computed, watch } from 'vue'

import { useRoute } from 'vue-router'

import Cookies from 'js-cookie'

const username = ref("");
const password = ref("");
const user = ref("");

const logined = ref(false);

const route = useRoute();

const ssoRegisters = {
  "a": {
    path: "http://test-a.com:6002/callback"
  },
  "b": {
    path: "http://test-b.com:6003/callback"
  },
}

const signIn = () => {
  fetch("http://127.0.0.1:7001/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    }),
    credentials: "include"
  }).then(async r => {
    const res = await r.json();
    if (res.success) {
      logined.value = true;
    } else {
      alert(res.message)
    }
  })
}

const replaceUrl = (val) => {
  const { identity, sid, name } = getCookie();

  const ssoObj = ssoRegisters[val.name]
  if (ssoObj && identity && sid && name) {
    const url = `${ssoObj.path}?redirect_url=${encodeURIComponent(val.redirect_url)}&identity=${encodeURIComponent(identity)}&name=${name}&sid=${encodeURIComponent(sid)}`;
    window.location.replace(url);
  }
}

const getCookie = () => {
  const identity = Cookies.get('identity')
  const sid = Cookies.get('sid')
  const name = Cookies.get('username')
  return {
    identity,
    sid,
    name
  }
}

onMounted(() => {
  const { identity, sid, name } = getCookie();
  if (identity && sid && name) {
    user.value = name;
    logined.value = true;
  } else {
    logined.value = false;
  }
})

watch([() => logined.value, () => route.query], (val) => {
  const [newLogined, newRoute] = val;
  if (newLogined && newRoute) {
    replaceUrl(newRoute);
  }
}, {
  deep: true
})

const isLogined = computed(() => logined.value)

</script>

<template>
  <div v-if="!isLogined">
    <h1>SSO登录</h1>
    <p>
      <span>username: </span>
      <input type="text" v-model="username">
    </p>
    <p>
      <span>password: </span>
      <input type="password" v-model="password">
    </p>
    <button @click="signIn">登录</button>
  </div>
  <div v-else>
    <h1>已登录</h1>
    <p>Hi， {{ user }}</p>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

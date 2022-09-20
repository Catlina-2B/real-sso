<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import { ref, onMounted, nextTick, computed } from 'vue'
  
  import { useRouter } from 'vue-router'
  
  import Cookies from 'js-cookie'
  
  const user = ref("");
  const userInfo = ref({});
  
  const router = useRouter();
  
  onMounted(() => {
    const name = Cookies.get('name')
    user.value = name;
  
    nextTick(() => {
      getData();
    })
  })
  
  const getData = () => {
    fetch("/api/get_user", {
      credentials: "include",
      headers: {
        'Content-Type': 'application/json;'
      }
    }).then(async r => {
      const res = await r.json();
      console.log(res);
      if (!res.success) {
        clearCookie();
        router.replace('/');
      } else {
        userInfo.value = res.data;
      }
    })
  }
  
  const clearCookie = () => {
    Cookies.remove('name')
    Cookies.remove('identity')
    Cookies.remove('sid')
  }
  
  const currentUserInfo = computed(() => userInfo.value);
  
  </script>
    
  <template>
    <router-view></router-view>
    <div>
      <h1>已登录</h1>
      <p>Hi， {{ user }}</p>
      <p>phone: {{currentUserInfo.phone}}</p>
      <p>email: {{currentUserInfo.email}}</p>
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
    
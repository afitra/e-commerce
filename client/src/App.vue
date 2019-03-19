<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/header">header</router-link>| -->
      <router-link to="/">Home</router-link>|
      <router-link to="/test">test</router-link>|
      <router-link to="/register">register</router-link>|
      <router-link @login-form="isLogin()" v-if="this.note" to="/login">login</router-link>|
      <router-link to="/list">list item</router-link>|
      <router-link to="/cart">shopping cart</router-link>|
      <router-link to="/checkout">checkout</router-link>|
    </div>
    <router-view/>
  </div>
</template>
<script>
// import checkout from "@/components/OneProduct.vue";
export default {
  name: "awal",
  data() {
    return {
      login: true,
      register: true,
      note: true,
      ok: ""
    };
  },
  methods: {
    isLogin(paylod) {
      console.log("masuk siini in login");
      this.note = paylod + "okok";
      console.log(paylod);
    }
  },
  updated() {
    if (!localStorage.token) {
      this.ok = true;
    } else {
      this.ok = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

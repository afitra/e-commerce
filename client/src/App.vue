<template>
  <div class="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/">
        <a class="navbar-brand">E-komer</a>
      </router-link>
      <button
        type="button"
        class="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link to="/">
            <a class="nav item active nav-link" v-on:click="proses(true)">home</a>
          </router-link>
          <router-link to="/troli">
            <a class="nav item active nav-link" v-on:click="getTroli(true)" v-if="adminMenu">Troli</a>
          </router-link>
          <router-link to="/checkout">
            <a
              class="nav item active nav-link"
              v-on:click="getCheckout(true)"
              v-if="adminMenu"
            >Checkout</a>
          </router-link>
          <router-link to="/transaksi">
            <a class="nav item active nav-link" v-on:click="getTransaksi(true)">Transaksi</a>
          </router-link>
          <router-link to="/admin">
            <a class="nav item active nav-link" v-on:click="addProduct( )" v-if="role">admin</a>
          </router-link>
          <router-link to="/register">
            <a class="nav item active nav-link" v-on:click="proses(true)" v-if="menu">Register</a>
          </router-link>
          <router-link to="/login">
            <a class="nav item active nav-link" v-if="menu">Login</a>
          </router-link>
          <a class="nav item active nav-link" v-if="menu==false" v-on:click="logout()">Logout</a>
        </ul>

        <form action="#" method="post" class="form-inline my-2 mylg-0">
          <input
            type="search"
            name="buscar"
            id="buscar"
            class="form-control mr-sm-2"
            placeholder="search product"
            aria-label="Buscar"
          >
          <button class="btn btn-outline-success" type="submit">search</button>
        </form>
      </div>
    </nav>
    <login v-if="isLogin" @to-homepage="proses($event) "></login>
    <troli v-if="troli"></troli>
    <checkout v-if="check"></checkout>
    <transaksi v-if="transaksi"></transaksi>
    <div v-if="allData">
      <!-- <admin v-if="role" v-bind:product="item" :menu="true"></admin> -->
      <div class="kotak" v-for=" item in data " v-bind:key="item._id">
        <card @to-remove="muatData" v-bind:product="item"></card>
      </div>
    </div>
    <!-- <div v-if="role">
      <div class="kotak" v-for=" item in data " v-bind:key="item._id">
        <card v-bind:product="item"></card>
      </div>
    </div>-->
    <router-view
      @to-homepage="hideAllData"
      @to-troli="hideAllData"
      @to-transaksi="hideAllData"
      @to-login="getLogin"
      @to-register="hideAllData"
    />
  </div>
</template>
<script>
import card from "@/components/cards.vue";
import Admin from "@/views/Admin.vue";
import formLogin from "@/views/login.vue";
import Troli from "@/views/Troli.vue";
import Check from "@/views/Checkout.vue";
import Transaksi from "@/views/Transaksi.vue";
const axios = require("./api/axios.js");
// v-on:click="proses(false)"
export default {
  components: {
    card: card,
    login: formLogin,
    troli: Troli,
    chekout: Check,
    transaksi: Transaksi,
    admin: Admin
  },
  data() {
    return {
      data: "",
      isLogin: false,
      allData: true,
      menu: true,
      troli: false,
      check: false,
      transaksi: false,
      role: false,
      adminMenu: true
    };
  },
  methods: {
    muatData() {
      console.log("lilijkjkjkjkjkjkjk");

      axios({
        url: `http://localhost:3000/product/all`,
        method: "get"
      })
        .then(data => {
          this.data = data.data;
          // console.log(data.data);
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    getLogin() {
      this.getRole();
      this.showAllData();
      this.menu = false;
    },
    proses(input) {
      var token = localStorage.getItem("token");
      // console.log(!input, "===");
      if (!token) {
        this.menu = true;
      } else {
        this.menu = false;
      }
      this.allData = input;
      this.isLogin = !input;
      this.getRole();
    },
    hideAllData(input) {
      console.log("jijij");

      this.allData = false;
    },
    showAllData(input) {
      // console.log("kokokokokokok");
      this.allData = true;
      this.muatData();
    },

    logout() {
      // console.log("masok logout");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      swal(`Logout`, "sukses !!!", "success");
      this.menu = true;
      this.allData = true;
      this.troli = false;
      this.chekout = false;
      this.transaksi = false;
      this.role = false;
      this.adminMenu = true;
      this.$router.push("/");
    },
    getTroli(input) {
      // console.log(input, "====");
      var token = localStorage.getItem("token");
      if (!token) {
        swal(`Troli`, "kosong, Login Dulu Dong !!!", "error");

        this.muatData();
        this.$router.push("/");
      } else {
        this.allData = false;
        // this.troli = input;
      }
    },
    getCheckout(input) {
      // console.log("okoko");

      // console.log(input);
      var token = localStorage.getItem("token");
      if (!token) {
        swal(`Troli`, "kosong, Login Dulu Dong !!!", "error");
        this.$router.push("/");
      } else {
        this.allData = false;
      }
    },
    getTransaksi(input) {
      var token = localStorage.getItem("token");
      if (!token) {
        swal(`Troli`, "kosong, Login Dulu Dong !!!", "error");
        this.muatData();
        this.$router.push("/");
      } else {
        this.allData = false;
      }
    },
    getRole() {
      axios({
        url: `/user/role`,
        method: "post",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          var role = data.data.role;
          // console.log("roleeeeees");
          // console.log(role);

          if (role == "admin") {
            this.role = true;
            // this.allData = true;
            this.adminMenu = false;
          } else {
            this.role = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addProduct() {
      this.allData = false;
    }
  },
  mounted() {
    this.getRole();
    var token = localStorage.getItem("token");

    if (!token) {
      this.menu = true;
    } else {
      this.menu = false;
    }
    this.allData = true;
    this.isLogin = false;
    this.troli = false;
    this.check = false;
    this.muatData();
  }
};
</script>
<style>
.kotak {
  /* border: 1px solid red; */
  display: inline-block;
  color: black;
}
</style>
 

 
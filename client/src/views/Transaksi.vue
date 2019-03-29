<template>
  <div class="container">
    <div class="row col-md-12 col-md-offset-3 custyle">
      <br>
      <table class="table table-striped custab">
        <thead>
          <tr>
            <th>ID</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tr v-for="item in data" v-bind:key="item._id">
          <td>{{item._id}}</td>
          <td>{{item.price}}</td>
          <td>{{item.tanggal}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
const axios = require("../api/axios.js");
import card from "@/components/cards.vue";
export default {
  components: {
    card: card
  },
  data() {
    return {
      data: [],
      total: 0
    };
  },
  methods: {
    adminData() {
      axios({
        url: `/transaksi/admin`,
        method: "get",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          console.log(data.data);

          var arr = data.data;
          this.data = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    nonAdmin() {
      axios({
        url: `/transaksi/all`,
        method: "get",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          var arr = data.data;
          this.data = arr;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$emit("to-transaksi");
    var role = localStorage.getItem("role");
    if (role == "admin") {
      this.adminData();
    } else {
      this.nonAdmin();
    }
  }
};
</script>

<style>
.container {
  color: black;
}
.custab {
  border: 1px solid #ccc;
  padding: 5px;
  margin: 5% 0;
  box-shadow: 3px 3px 2px #ccc;
  transition: 0.5s;
}
.custab:hover {
  box-shadow: 3px 3px 0px transparent;
  transition: 0.5s;
}
</style>
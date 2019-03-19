<template>
  <div class="container">
    <div class="card" style="width:300px">
      <img class="card-img-top" :src="product.url" alt="Card image" style="width:100%">
      <div class="card-body">
        <h4>{{product.name}}</h4>
        <label>Rp. {{product.price}}</label>
        <label>{{product.tag}}</label>
        <p>{{product.detail}}</p>
        <a v-on:click="add(product._id,product.name)">
          <router-link to="/list">add to cart</router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 2px solid black;
}
</style>

<script>
export default {
  props: ["product"],
  name: "checkout",
  data() {
    return {
      data: "",
      pesan: ""
    };
  },
  methods: {
    add(ID, nameProduct) {
      console.log(localStorage.token);
      console.log("----------------");
      console.log(ID);

      //       axios
      //         .put(`http://localhost:3000/user/add`,headers:{
      // token:localStorage.token
      //         }, {
      //           id: ID
      //         })
      axios({
        url: `http://localhost:3000/user/add`,
        method: "patch",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          id: ID
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.pesan = "berhasil";
          swal(`selamat ${nameProduct}  ${this.pesan}`);
          // this.$emit("login-form", true);
          // this.status = true;
        })
        .catch(err => {
          console.log(err);
          this.pesan = "gagal";
          swal(`selamat ${nameProduct}  ${this.pesan}`);
        });
      // console.log("masok   kerjakan login dulu biar bisa add cart");
    }
  }
};
</script>

 

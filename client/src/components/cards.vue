<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4">
        <div class="card" style="width:280px">
          <img
            class="card-img-top"
            :src="product.image"
            alt="Card image"
            width="350px"
            height="197px"
          >
          <div class="card-body">
            <h4>{{product.name}}</h4>
            <label>Rp. {{product.price}}</label>
            <br>
            <label>{{product.tag}}</label>
            <p>{{product.detail}}</p>
            <button
              v-if="button"
              type="submit"
              class="btn btn-primary"
              v-on:click.prevent="add(product._id,product.name)"
            >add to Troli</button>

            <button
              v-if="admin"
              type="submit"
              class="btn btn-primary"
              v-on:click.prevent="edit(product._id,product.name)"
            >edit</button>

            <button
              v-if="admin"
              type="submit"
              class="btn btn-primary"
              v-on:click.prevent="remove(product._id,product.name)"
            >detele</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("@/api/axios.js");
export default {
  props: ["product"],
  name: "card",
  data() {
    return {
      button: true,
      admin: false
    };
  },
  methods: {
    add(ID, productName) {
      var token = localStorage.getItem("token");
      axios({
        url: `/user/add`,
        method: "patch",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          id: ID
        }
      })
        .then(data => {
          //   console.log(data.data);
          swal(`${productName}`, "sukses  ditambahkan!!!", "success");
        })
        .catch(err => {
          console.log(err);
          swal(`${err.message}`, "gagal  ditambahkan!!!", "error");
        });
    },
    edit() {
      this.$router.push("/");
      this.data = false;
    },
    remove() {
      var token = localStorage.getItem("token");
      axios({
        url: `/user/add`,
        method: "patch",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          id: ID
        }
      });
    },
    role() {
      var token = localStorage.getItem("token");
      // if (!token) {
      //   this.admin = false;
      // }
      axios({
        url: `/user/role`,
        method: "post",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          var posisi = data.data.role;
          // console.log("xxxxxxxxx");
          // console.log(data.data);
          // console.log(posisi);

          this.button = false;
          if (posisi == "admin") {
            this.admin = true;
          } else {
            this.button = true;
            this.admin = false;
          }
        })
        .catch(({ err }) => {
          swal(`${response.data.messege}`, "Try Again !!!", "error");
        });
    }
  },
  mounted() {
    this.role();
  },
  updated() {
    // this.role();
  }
};
</script>
<style scoped>
.card {
  border: 2px solid black;
}

.container {
  margin-top: 20px;
}
</style>

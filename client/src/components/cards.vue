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
            <input type="text" placeholder="input new name" v-model="newName" v-if="admin">
            <br>
            <label>Rp. {{product.price}}</label>
            <br>
            <input type="text" placeholder="input new price" v-model="newPrice" v-if="admin">
            <br>

            <label>{{product.tag}}</label>
            <br>
            <input type="text" placeholder="input new tag" v-model="newTag" v-if="admin">
            <br>
            <p>{{product.detail}}</p>
            <button
              v-if="addButton"
              type="submit"
              class="btn btn-primary"
              v-on:click.prevent="add(product._id,product.name)"
            >add to Troli</button>

            <button
              v-if="admin"
              type="submit"
              class="btn btn-primary"
              v-on:click="edit(product._id,product.name)"
            >edit</button>

            <button
              v-if="admin"
              type="submit"
              class="btn btn-primary"
              v-on:click="remove(product._id,product.name)"
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
  props: ["product", "menu"],
  name: "card",
  data() {
    return {
      addButton: "",
      admin: false,
      formEdit: false,
      name: this.product.name,
      price: this.product.price,
      tag: this.product.tag,
      newName: "",
      newPrice: "",
      newTag: ""
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
          swal(`${productName}`, "sukses  ditambahkan!!!", "success");
          // this.$emit("to-show");
        })
        .catch(err => {
          console.log(err);
          swal(`${err.message}`, "gagal  ditambahkan!!!", "error");
        });
    },
    edit(ID, productName) {
      this.formEdit = true;
      if (this.newName == "") {
        this.newName = this.name;
      }
      if (this.newPrice == "") {
        this.newPrice = this.price;
      }
      if (this.newTag == "") {
        this.newTag = this.tag;
      }
      let obj = {
        name: this.newName,
        price: this.newPrice,
        tag: this.newTag
      };

      axios({
        url: `/product/edit/${ID}`,
        method: "patch",
        headers: {
          token: localStorage.getItem("token"),
          role: localStorage.getItem("role")
        },
        data: {
          id: ID,
          name: this.newName,
          price: this.newPrice,
          tag: this.newTag
        }
      })
        .then(data => {
          console.log(data.data.name);

          this.product.name = data.data.name;
          this.product.price = data.data.price;
          this.product.tag = data.data.tag;
          this.newName = "";
          this.newPrice = "";
          this.newTag = "";
          swal(`selamat title    berhasil`);
        })
        .catch(err => {
          swal(`selamat title    gagal`);
        });
    },
    remove(ID, productName) {
      var token = localStorage.getItem("token");
      axios({
        url: `/product/delete/${ID}`,
        method: "delete",
        headers: {
          token: localStorage.getItem("token"),
          role: localStorage.getItem("role")
        }
      })
        .then(data => {
          this.$emit("to-remove");
          swal(`selamat title  ${this.newName}  berhasil di hapus`);
        })
        .catch(err => {
          swal(`sorry title  ${this.newName}  gagal di hapus`);
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
          // this.addButton = false;
          if (posisi == "admin") {
            this.admin = true;
            this.addButton = false;
          } else {
            // this.addButton = true;
            this.admin = false;
          }
        })
        .catch(({ err }) => {
          swal(`${response.data.messege}`, "Try Again !!!", "error");
        });
    }
    // getButton() {
    //   }
  },
  mounted() {
    this.role();
    // console.log(this.menu, "okokokokoko");
    if (this.menu == undefined) {
      this.addButton = true;
    } else {
      this.addButton = false;
    }
    this.name = this.product.name;
    this.price = this.product.price;
    this.tag = this.product.tag;
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

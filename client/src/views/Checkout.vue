<template>
  <div class="checkout">
    <div class="container">
      <div class="row col-md-12 col-md-offset-2 custyle">
        <br>
        <table class="table table-striped custab">
          <thead>
            <h3>Total Price : Rp. {{total}},-</h3>
            <tr>
              <th>ID Product</th>
              <th>Name</th>
              <th>Price</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tr v-for=" (item,index) in data" v-bind:key="item.index">
            <td>{{item._id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-primary"
                v-on:click.prevent="remove(item._id,index)"
              >delete</button>
            </td>
          </tr>
        </table>
        <br>
        <!-- <button type="button" class="btn btn-primary" v-on:click.prevent="pay()">Pay</button> -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >Pay Now</button>
        <!-- modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">enter your transfer code</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input type="text" v-model="code">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  v-on:click.prevent="pay()"
                >Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
  </div>
</template>

<script>
const axios = require("../api/axios.js");
export default {
  components: {},
  data() {
    return {
      data: [],
      total: 0,
      code: ""
    };
  },
  methods: {
    load() {
      this.data = [];
      axios({
        url: `/user/list`,
        method: "post",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          var arr = data.data[0].productList;
          // console.log(arr);
          for (var i = 0; i < arr.length; i++) {
            //   console.log(arr[i], "====");
            this.data.push(arr[i]);
            this.total += arr[i].price;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    pay() {
      if (this.data.length == 0) {
        swal(`gagal`, "Try Again !!!", "error");
        throw Error;
      }
      axios({
        url: `/user/pay`,
        method: "patch",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          // console.log(data.data);
          var arr = [];
          for (var i = 0; i < this.data.length; i++) {
            arr.push(this.data[i]._id);
          }
          axios({
            url: `/transaksi/add`,
            method: "post",
            headers: {
              token: localStorage.getItem("token")
            },
            data: {
              price: this.total,
              productList: arr
            }
          }).then(data => {
            swal(
              `selamat Transaksi`,
              `${data.data._id} dalam proses pengiriman  !!!`,
              "success"
            );
            this.data = [];
            this.total = 0;
          });
        })
        .catch(err => {
          console.log(err.message);
          swal(`${err.message}`, "Try Again !!!", "error");
        });
    },
    remove(ID, index) {
      // console.log(index);
      var num = index;
      if (index == 0) {
        index = -1;
      }
      console.log(index);

      axios({
        url: `/user/removelist`,
        method: "patch",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          index: index
        }
      })
        .then(data => {
          swal(`item`, "BErhasil dihapus  !!!", "success");
          this.$router.push("/checkout");
          var temp = "";
          for (var i = 0; i < this.data.length; i++) {
            if (this.data[i]._id == ID) {
              temp = i;
            }
          }
          this.total -= this.data[temp].price;
          this.data.splice(temp, 1);
          // console.log(temp);
        })
        .catch(err => {
          swal(`item`, "gagal dihapus  !!!", "success");
        });
    }
  },
  mounted() {
    this.$emit("to-check", true);
    this.load();
  },
  updated() {}
};
</script>

<style scope>
.checkout {
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
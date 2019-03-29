<template>
  <div class="troli">
    <h1 v-if="data.length==0">Troli kosong belanja dong !!!</h1>
    <div class="kotak" v-for=" (item,index) in data " v-bind:key="index">
      <card v-bind:product="item" :menu="false"></card>
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
      data: []
    };
  },
  mounted() {
    this.$emit("to-troli");

    // console.log(token);
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
        }
      })
      .catch(err => {
        console.log(err);
        // this.$emit("to-show");
        // this.
        // this.$router.push("/");
      });

    // if (this.data.length == 0) {
    //   this.$emit("to-show");
    //   this.$router.push("/");
    //   swal(`troli kosong`, "blanja dulu !!!", "error");
    // }
  }
};
</script>

<style>
.troli {
  color: black;
}
</style>


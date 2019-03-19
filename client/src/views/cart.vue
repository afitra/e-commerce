<template>
  <div>
    <div class="container list" v-for="item in data[0].productList" v-bind:key="item._id">
      <div class="row">
        <div class="col-md-4">
          <list v-bind:product="item"></list>
        </div>
      </div>
    </div>
    <!-- {{data}} -->
    <!-- {{data[0].productList[0]}} -->
  </div>
</template>
<style scoped>
</style>

<script>
import list from "@/components/Listcart.vue";
export default {
  components: {
    list: list
  },
  data() {
    return {
      data: ""
    };
  },
  beforeMount() {
    axios({
      url: `http://localhost:3000/user/list`,
      method: "post",
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(data => {
        this.data = data.data;

        // console.log(this.data + "===");
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>



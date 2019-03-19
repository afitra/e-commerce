<template>
  <div>
    <div class="container list" v-for="item in data" v-bind:key="item._id">
      <div class="row">
        <div class="col-md-4">
          <checkout v-bind:product="item"></checkout>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>

<script>
import checkout from "@/components/OneProduct.vue";
export default {
  components: {
    checkout: checkout
  },
  data() {
    return {
      data: ""
    };
  },
  beforeMount() {
    axios
      .get(`http://localhost:3000/product/all`)

      .then(({ data }) => {
        this.data = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>



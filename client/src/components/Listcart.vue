<template>
  <div class="container">
    <div class="card" style="width:300px">
      <div class="card-body">
        <img class="card-img-top" :src="product.url" alt="Card image" style="width:100%">

        <h4>{{product.name}}</h4>
        <label>Rp. {{product.price}}</label>
        <label>{{product.tag}}</label>
        <p>{{product.detail}}</p>
      </div>
    </div>
  </div>
</template>

 
<script>
export default {
  props: ["product"],
  name: "list",
  data() {
    return {
      data: ""
    };
  }
};
</script>

 
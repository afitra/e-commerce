<template>
  <div>
    <h1>nominal yang harus dibayar adalah</h1>
    <div v-for="item in data[0].productList">
      <label>{{item.name}}</label>
      <br>
      <label>{{item.price}}</label>
    </div>
    <!-- {{data[0].productList}} -->
    <h3>total</h3>
    <H3>Rp. {{this.nominal}}</H3>
    <!-- {{this.data[0].productList[0].price}} -->
  </div>
</template>


 
 
  <script>
import list from "@/components/Listcart.vue";
export default {
  components: {
    list: list
  },
  data() {
    return {
      data: "",
      nominal: 0
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
        for (var i = 0; i < this.data[0].productList.length; i++) {
          this.nominal += this.data[0].productList[i].price;
        }
        console.log(this.data);

        // this.nominal = temp;
        // console.log(this.nominal);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
 


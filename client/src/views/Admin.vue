<template>
  <div class="add">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <form>
            <fieldset>
              <input
                type="text"
                v-model="name"
                name="name"
                id="name"
                placeholder="name"
                class="form-control"
              >
              <input
                type="text"
                v-model="price"
                name="price"
                id="price"
                placeholder="price"
                class="form-control"
              >
              <input
                type="text"
                v-model="tag"
                name="tag"
                id="tag"
                placeholder="tag"
                class="form-control"
              >

              <div class="form-group mx-auto" style="width: 50%">
                <label for="exampleInputFile">Upload product image</label>
                <input
                  type="file"
                  id="file"
                  class="inputFile"
                  ref="image"
                  v-on:change="handleFileUpload"
                  required
                >
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                v-on:click.prevent=" post()"
              >Post Product</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import card from "@/components/cards.vue";
export default {
  name: "postImage",
  components: {
    card: card
  },
  data() {
    return {
      data: "",
      name: "",
      price: "",
      tag: "",
      image: "",
      formData: "",
      role: ""
    };
  },
  methods: {
    handleFileUpload(event) {
      console.log("masuk file upload", this.$refs.image);
      this.image = this.$refs.image.files[0];
      console.log(this.image);
    },
    post() {
      console.log("masok ga sini");
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price);
      formData.append("tag", this.tag);
      formData.append("image", this.image);
      this.formData = formData;
      console.log(formData);

      axios
        .post(`http://localhost:3000/user/uploud`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
            role: localStorage.getItem("role")
          }
        })
        .then(data => {
          swal(`selamat title    berhasil`);
        })
        .catch(err => {
          swal(`selamat title    gagal`);
        });
    }
  },
  mounted() {}
};
</script>

<style>
.add {
  color: black;
  padding-top: 10%;
}
</style>


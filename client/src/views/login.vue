 <template>
  <div class="container login-form">
    <h1>LOGIN</h1>
    <div class="form">
      <div class="form-content">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                v-model="email"
                class="form-control"
                placeholder="Your Email *"
                value
              >
            </div>
            <div class="form-group">
              <input
                type="password"
                v-model="password"
                class="form-control"
                placeholder="Your Password *"
                value
              >
            </div>
          </div>
        </div>
        <button>
          <a v-on:click="login">login</a>
        </button>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      token: "",
      status: true
    };
  },
  methods: {
    login() {
      axios
        .post(`http://localhost:3000/user/login`, {
          email: this.email,
          password: this.password
        })

        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.token = data.token;
          this.email = "";
          this.password = "";
          // this.$emit("login-form", true);
          // this.status = true;
          this.pesan = "berhasil";
          swal(`selamat  Login  ${this.pesan}`);
        })
        .catch(err => {
          console.log(err);
          this.pesan = "gagal";
          swal(`selamat  login ${this.pesan}`);
        });
    }
  },
  updated() {
    // if (!this.localStorage.token) {
    //   this.status = true;
    // }
  }
};
</script>



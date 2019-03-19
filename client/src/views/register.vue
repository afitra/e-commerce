  <template>
  <div class="container register-form">
    <h1>REGISTER</h1>
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
          <a v-on:click="register">register</a>
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
      status: true,
      pesan: ""
    };
  },
  methods: {
    register() {
      axios
        .post(`http://localhost:3000/user/register`, {
          email: this.email,
          password: this.password
        })

        .then(({ data }) => {
          console.log(data);
          this.pesan = "berhasil";
          swal(`selamat  register ${this.pesan}`);
        })
        .catch(err => {
          console.log(err);
          this.pesan = "GAGAL";
          swal(`selamat  register ${this.pesan}`);
        });
    }
  }
};
</script>
 
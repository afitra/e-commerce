 <template>
  <div>
    <div class="body"></div>
    <div class="grad"></div>
    <div class="header">
      <div>
        Login
        <span>User</span>
      </div>
    </div>
    <br>
    <div class="login">
      <input type="text" placeholder="email" name="email" v-model="email">
      <br>
      <input type="password" placeholder="password" name="password" v-model="password">
      <br>

      <input type="button" value="login" v-on:click.prevent="login()">
      <!-- <router-link to="/">
        <button v-on:click.prevent="login()" type="button" class="btn btn-primary">Login</button>
      </router-link>-->

      <br>

      <button type="button" class="btn btn-primary" v-on:click.prevent="back()">Go Home</button>
    </div>
  </div>
</template>
<script>
const axios = require("../api/axios.js");

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      pesan: "",
      button: ""
    };
  },
  methods: {
    back() {
      this.$emit("to-homepage", true);
      this.$router.push("/");
    },
    login() {
      // console.log("masok sini");
      axios({
        url: `/user/login`,
        method: "post",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          // console.log(data);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("role", data.data.role);
          this.pesan = "suksess";
          swal(`${this.pesan}`, "Login  !!!", "success");
          this.email = "";
          this.password = "";

          this.$emit("to-login");
          this.$router.push("/");
        })
        .catch(({ response }) => {
          // console.log(response.data.messege);

          this.email = "";
          this.password = "";
          this.pesan = response.data.messege;
          swal(`${this.pesan}`, "Try Again !!!", "error");
          this.pesan = "";
        });
    }
  },
  mounted() {
    this.$emit("to-homepage", true);
  }
};
</script>

 <style scope >
body {
  margin: 0;
  padding: 0;
  background: #fff;

  color: #fff;
  font-family: Arial;
  font-size: 12px;
}

.body {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -40px;
  bottom: -40px;
  width: auto;
  height: auto;
  background-image: url(https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=background-blur-clean-531880.jpg&fm=jpg);
  background-size: relative;

  z-index: 0;
}

.grad {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -40px;
  bottom: -40px;
  width: auto;
  height: auto;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(0, 0, 0, 0)),
    color-stop(100%, rgba(0, 0, 0, 0.65))
  ); /* Chrome,Safari4+ */
  z-index: 1;
  opacity: 0.7;
}

.header {
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 255px);
  z-index: 2;
}

.header div {
  float: left;
  color: #fff;
  font-family: "Exo", sans-serif;
  font-size: 35px;
  font-weight: 200;
}

.header div span {
  color: #8b008b !important;
}

.login {
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 50px);
  height: 150px;
  width: 350px;
  padding: 10px;
  z-index: 2;
}

.login input {
  width: 250px;
  height: 30px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  color: black;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 4px;
}

.login input[type="button"] {
  width: 260px;
  height: 35px;
  background: #3cb371;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 2px;
  color: black;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 6px;
  margin-top: 10px;
}

.login input[type="button"]:hover {
  opacity: 0.8;
}

.login input[type="button"]:active {
  opacity: 0.6;
}

.login input[type="text"]:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.login input[type="password"]:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.login input[type="button"]:focus {
  outline: none;
}

::-webkit-input-placeholder {
  color: black;
}

::-moz-input-placeholder {
  color: black;
}
</style>
 
<template>
  <div class="login">
    <NavBar />
    <div class="container pt-3">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h1 class="display-1 text-center">
          <strong>Masuk</strong>
        </h1>
        <form class="mt-3" v-on:submit.prevent>
          <div class="mb-3">
            <input
              type="email"
              class="form-control-lg border border-dark border-5"
              v-model="user.email"
              placeholder="E-Mail"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control-lg border border-dark border-5"
              v-model="user.password"
              placeholder="Kata Sandi"
              required
            />
          </div>
          <div class="text-center mt-4">
            <button
              type="submit"
              class="btn btn-dark pl-4 pr-4 pt-2 pb-2"
              @click="handleLogin"
            >
              <strong>MASUK SEKARANG</strong>
            </button>
            <p class="mt-3">
              Belum memiliki akun?
              <router-link to="/register">Daftar</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import User from "@/models/user.js";

export default {
  name: "Login",
  components: {
    NavBar,
  },
  data() {
    return {
      user: new User("", ""),
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin() {
      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/dashboard");
          },
          (error) => {
            this.message =
              (error.response && error.response.data.message) ||
              error.message ||
              error.toString();

            this.$toast.error(this.message, {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          }
        );
      } else {
        this.$toast.error("Email dan Kata Sandi Harus Diisi!", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
};
</script>

<style scoped>
.btn-dark {
  background-color: #000;
  border-radius: 30px;
}
</style>
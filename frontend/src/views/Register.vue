<template>
  <div class="register">
    <NavBar />
    <div class="container pt-3">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h1 class="display-1 text-center">
          <strong>Daftar</strong>
        </h1>
        <form class="mt-3" v-on:submit.prevent>
          <div class="mb-3">
            <input
              type="text"
              class="form-control-lg border border-dark border-5"
              v-model="user.name"
              placeholder="Nama"
            />
          </div>
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
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control-lg border border-dark border-5"
              placeholder="Ulangi Kata Sandi"
              v-model="duplicate_password"
            />
          </div>
          <div class="text-center mt-4">
            <button
              type="submit"
              class="btn btn-dark pl-4 pr-4 pt-2 pb-2"
              @click="handleRegister"
            >
              <strong>DAFTAR SEKARANG</strong>
            </button>
            <p class="mt-3">
              Sudah memiliki akun?
              <router-link to="/login">Masuk</router-link>
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
  name: "Register",
  components: {
    NavBar,
  },
  data() {
    return {
      user: new User("", "", ""),
      message: "",
      duplicate_password: "",
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
    handleRegister() {
      if (
        this.user.name &&
        this.user.email &&
        this.user.password &&
        this.duplicate_password
      ) {
        if (this.user.password === this.duplicate_password) {
          this.$store.dispatch("auth/register", this.user).then(
            (response) => {
              this.$router.push("/login");
              this.message = response.message;
              this.$toast.success(this.message, {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
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
          this.$toast.error("Kata sandi tidak cocok!", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        }
      } else {
        this.$toast.error("Data Harus Diisi!", {
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
h1 {
  font-family: "Bree Serif";
}

.btn-dark {
  background-color: #000;
  border-radius: 30px;
}
</style>
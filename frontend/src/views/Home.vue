<template>
  <div class="home">
    <NavBar />

    <div class="container">
      <div class="row mt-5 justify-content-center">
        <h1 class="display-1 text-center">
          <strong>Selamat Datang<br />di HiBlog!</strong>
        </h1>
        <p class="mt-1 text-center lead">
          HiBlog! adalah tempat bagi kamu untuk menulis,<br />membaca, dan
          berjejaring
        </p>
      </div>

      <div class="row justify-content-center pb-5">
        <div>
          <router-link class="btn btn-dark pr-3 pl-3" to="/register"
            ><strong>GABUNG SEKARANG</strong></router-link
          >
        </div>
      </div>

      <ArtikelBaru />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import ArtikelBaru from "@/components/ArtikelBaru.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    ArtikelBaru,
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
};
</script>

<style scoped>
</style>
<template>
  <div class="dashboard">
    <Navbar />
    <div class="container">
      <div class="artikel-baru">
        <div class="row justify-content-center mt-5 mb-4">
          <h1 class="display-4">Artikel Kamu</h1>
        </div>

        <div class="row justify-content-center">
          <div
            class="col-lg-4 mb-3"
            v-for="(blog, index) in blogs"
            :key="blog.id"
          >
            <CardBlog :blog="blog" :index="index" />
          </div>
        </div>
      </div>
      <div class="row justify-content-center pb-5">
        <div>
          <router-link class="btn btn-dark pr-3 pl-3" to="/create_article"
            ><strong>BUAT ARTIKEL BARU</strong></router-link
          >
        </div>
      </div>
      <ArtikelBaru />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import UserService from "@/services/userService.js";
import ArtikelBaru from "@/components/ArtikelBaru.vue";
import CardBlog from "@/components/CardBlog.vue";

export default {
  name: "dashboard",
  components: {
    Navbar,
    ArtikelBaru,
    CardBlog,
  },
  data() {
    return {
      blogs: {},
    };
  },
  methods: {
    setBlogs(data) {
      this.blogs = data.data;
      console.log(this.blogs);
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push("/");
    }
    UserService.getUserBlog()
      .then((response) => {
        this.setBlogs(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
</script>

<style>
</style>
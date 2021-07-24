<template>
  <div class="artikel-baru">
    <div class="row justify-content-center mt-5 mb-4">
      <h1 class="display-5">Baca Artikel Terbaru Hari Ini!</h1>
    </div>

    <div class="row mb-5 justify-content-center">
      <div class="col-lg-4 mb-3" v-for="(blog, index) in blogs" :key="blog.id">
        <CardBlog :blog="blog" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
import CardBlog from "@/components/CardBlog.vue";
import BlogService from "@/services/blogServices.js";

export default {
  name: "ArtikelBaru",
  components: {
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
    },
  },
  mounted() {
    BlogService.getAllBlog()
      .then((response) => {
        this.setBlogs(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>
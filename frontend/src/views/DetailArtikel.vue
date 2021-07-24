<template>
  <div class="detail-artikel">
    <NavBar />
    <div class="container mt-5">
      <h1 class="row">{{ data.title }}</h1>
      <div class="row mt-3">
        <b-icon-circle></b-icon-circle>
        <h6 class="ml-2">
          {{ data.users.name }} <b-icon-dot></b-icon-dot>
          {{ data.categories.categoryName }} <b-icon-dot></b-icon-dot>
          {{ date }}
        </h6>
      </div>
      <div class="row mt-3 mb-5" v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import blogService from "@/services/blogServices.js";
import moment from "moment";

export default {
  name: "DetailArtikel",
  data() {
    return {
      id: this.$route.params.id,
      data: {},
      date: "",
    };
  },
  components: {
    NavBar,
  },

  methods: {
    setDetails(data) {
      this.data = data;
      console.log(this.data);
    },
    convertDate() {
      let data = moment(this.data.createdAt).format("LL");
      this.date = data;
    },
  },
  mounted() {
    blogService
      .getBlogById(this.id)
      .then((response) => {
        this.setDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.convertDate();
  },
};
</script>

<style scoped>
p,
h6 {
  font-weight: 500;
}
</style>
<template>
  <div class="buat-artikel">
    <Navbar />
    <div class="container">
      <div class="col mt-5">
        <h1 class="display-1 text-center">
          <strong>Buat Artikel</strong>
        </h1>
      </div>
      <div class="col">
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1"><h1>Judul Artikel</h1></label>
            <input
              type="text"
              class="form-control border-dark border-5"
              id="exampleFormControlInput1"
              placeholder="Buatlah judul yang menarik"
              v-model="data.title"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1"
              ><h1>Kategori Artikel</h1></label
            >
            <select
              class="form-control border-dark border-5"
              id="exampleFormControlSelect1"
              v-model="data.category_name"
            >
              <option>Olahraga</option>
              <option>Kesehatan</option>
              <option>Seni</option>
              <option>Teknologi</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1"
              ><h1>Konten Artikel</h1></label
            >
            <vue-editor
              v-model="data.content"
              :editorToolbar="customToolbar"
            ></vue-editor>
          </div>
          <div class="text-right mt-4 mb-5">
            <router-link
              to="/dashboard"
              type="submit"
              class="btn btn-danger pl-4 pr-4 pt-2 pb-2 mr-3"
            >
              <strong>BATAL</strong></router-link
            >
            <button
              type="submit"
              class="btn btn-success pl-4 pr-4 pt-2 pb-2"
              @click="handleCreate"
            >
              <strong>KIRIM</strong>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import userService from "@/services/userService.js";
import { VueEditor } from "vue2-editor";

export default {
  name: "BuatArtikel",
  components: {
    Navbar,
    VueEditor,
  },
  data() {
    return {
      data: {
        title: "",
        category_name: "",
        content: "",
      },
      message: "",
      customToolbar: [
        [{ header: [false, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: -1 }, { indent: "+1" }],
        ["link", "blockquote", "code-block"],
      ],
    };
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
  },
  methods: {
    handleCreate() {
      if ((this.data.title, this.data.category_name, this.data.content)) {
        userService
          .createBlog(this.data)
          .then(() => {
            this.$toast.success("Artikel Berhasil Dibuat!", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            this.$router.push("/login");
          })
          .catch((error) => {
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
          });
      } else {
        this.$toast.error("Data Tidak Boleh Kosong!", {
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
h1,
h2,
h3,
h4,
h5 {
  font-family: "Bree Serif";
}
</style>
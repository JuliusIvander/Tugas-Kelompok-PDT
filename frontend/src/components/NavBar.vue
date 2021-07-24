<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand
          ><b-link :to="{ path: '/' }"
            ><img
              src="../assets/images/HiBlog.png"
              alt=""
              width="100%"
              height="65px" /></b-link
        ></b-navbar-brand>

        <b-navbar-toggle
          target="nav-collapse"
          v-if="currentPath()"
        ></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <li class="nav-item" v-if="currentPath()">
              <router-link class="nav-link active mr-4" to="/login"
                ><strong>Masuk</strong></router-link
              >
            </li>
            <li class="nav-item" v-if="currentPath()">
              <router-link class="btn btn-light" to="/register"
                ><strong>GABUNG SEKARANG</strong></router-link
              >
            </li>
          </b-navbar-nav>
        </b-collapse>
        <b-navbar-nav class="ml-auto" v-if="loggedIn()">
          <li class="nav-item">
            <b-nav-item-dropdown text="Lang" right no-caret>
              <template slot="button-content">
                <p class="profile">
                  {{ sure_name }}
                </p>
              </template>
              <!-- <b-dropdown-item class="items">Profil Saya</b-dropdown-item> -->
              <b-dropdown-item class="items" @click="logOut"
                >Keluar</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </li>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      sure_name: "",
      paths: ["/"],
    };
  },
  methods: {
    currentPath() {
      if (this.paths.includes(this.$router.history.current["path"])) {
        return true;
      }
      return false;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
  mounted() {
    if (this.$store.state.auth.user) {
      this.sure_name = this.$store.state.auth.user.name.charAt(0).toUpperCase();
    } else {
      this.sure_name = "$";
    }
  },
};
</script>

<style>
.navbar.navbar-dark.bg-dark {
  background-color: #000000 !important;
}

.btn.btn-light {
  border-radius: 30px;
}

.items a {
  padding-top: 17px;
  padding-bottom: 17px;
}

.b-nav-dropdown {
  background-color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.profile {
  color: black;
  margin: 0;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
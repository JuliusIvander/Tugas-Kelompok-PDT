<template>
  <div class="card card-blog">
    <div class="card-body">
      <div class="row">
        <div class="col-2 number">
          <h1 class="text-right">{{ index + 1 }}</h1>
        </div>
        <div class="col">
          <h5 class="card-title row">
            <strong>{{ blog.title }}</strong>
          </h5>
          <div class="row mb-2 d-flex align-items-center">
            <b-icon-circle></b-icon-circle>
            <h6 class="card-subtitle ml-2">
              {{ blog.users.name }} <b-icon-dot></b-icon-dot>
              {{ blog.categories.categoryName }}
            </h6>
          </div>
        </div>
      </div>
      <router-link
        :to="`/article/${blog.id}`"
        class="stretched-link"
      ></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardBlog",
  props: ["blog", "index"],
};
</script>

<style scoped>
.card {
  border: none;
}

h5 {
  text-overflow: ellipsis;
  min-height: 70px;
  max-height: 70px;
  overflow: hidden;
}

h6 {
  margin: 0;
}

h1 {
  opacity: 0.2;
}
</style>
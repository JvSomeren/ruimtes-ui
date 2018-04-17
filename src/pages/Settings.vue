<template>
  <div>
    <navbar></navbar>

    <div class="section">
      <div class="container template-horizontal">
        <aside class="sidebar menu">
          <p class="menu-label">
            Algemeen
          </p>
          <ul class="menu-list">
            <li><router-link to="/settings">Overzicht</router-link></li>
            <li><router-link to="/settings/admins">Beheerders</router-link></li>
          </ul>
          <p class="menu-label">
            Administratie
          </p>
          <ul class="menu-list">
            <li><router-link to="/settings/requests">Verzoeken</router-link></li>
            <li><router-link to="/settings/resources">Ruimtes</router-link></li>
          </ul>
        </aside>

        <div class="default-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {

  },
  methods: {

  },
  created() {

  }
}
</script>

<style lang="scss">
.template-horizontal {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex: 1;
  flex: 1;

  .default-container {
    overflow: hidden;
    width: 100%;
  }
}

.sidebar {
  min-width: 16rem;
  margin-right: 3rem;
  position: -webkit-sticky;
  position: sticky;
  top: 1rem;
  overflow: auto;
}
</style>
<template>
  <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
      </router-link>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        Start
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="is-field">
            <p class="control">
              <router-link class="button is-primary" to="/settings">
                <span class="icon">
                  <i class="mdi mdi-settings"></i>
                </span>
                <span>Instellingen</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>

  </nav>
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

</style>
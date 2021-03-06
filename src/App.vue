<template>
  <Intro/>
</template>

<script>
import Intro from './components/Intro.vue'

export default {
  name: 'App',
  components: {
    Intro
  }
}
</script>

<style lang="scss">
@import './styles/colors';
@import './styles/reset';
@import './styles/spacing';

body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.25;
  color: $text-grey;
}

// Headings
h1, h2, h3 { font-weight: bold; }
h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; }
h3 { font-size: 1.25rem; }
h4 { font-size: 1.1rem; }
h5 { font-size: 1rem; }
h6 { font-size: 0.8rem; }

p {
  margin-top: $standard;
  max-width: 37.5rem; // about 600px
}

// Font Sizes
.huge-text { font-size: 4rem; }
.larger-text { font-size: 2rem; }
.big-text { font-size: 1.5rem; }
</style>

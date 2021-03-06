<template>
  <div>
    <h1>Game</h1>

    <button @click="$emit('changeView', 'intro')">
      Back to Intro
    </button>
  </div>
</template>

<script>
export default {
  name: 'Game',
  emits: [ 'changeView' ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';


</style>

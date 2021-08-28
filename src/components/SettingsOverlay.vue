<template>
  <div class="overlay">
    <!-- TODO: Move all text to come from i18n -->
    <div class="overlay-content">
      <div class="title">
        <h1>Settings</h1>

        <button class="btn -blue" @click="closeOverlay()">Close</button>
      </div>

      <p>
        Some neat settings are coming soon!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'AnalyticsOverlay',

  props: {
    tiles: [],
  },

  emits: {
    closed(): void { },
  },

  methods: {
    closeOverlay() {
      this.$emit('closed');
    }
  }
})

/**
 * A component that renders an overlay showing simulator settings
 */
export default class AnalyticsOverlay extends Vue {
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';


.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.25);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.overlay-content {
  flex-basis: 800px;
  max-width: 90%;
  margin: 0 auto 5rem auto;
  background-color: #000;
  border-radius: 0.5rem;
  padding: 1rem;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn { margin-top: 0; }
  }

  dl {
    dt {
      font-weight: bold;
      margin-top: 0.5rem;
    }
  }
}
</style>

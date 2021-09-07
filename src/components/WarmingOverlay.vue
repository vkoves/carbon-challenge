<template>
  <focus-trap :returnFocusOnDeactivate="true" initialFocus="#settings-close">
    <div class="overlay -settings" @click="closeOverlay" @keydown.esc="closeOverlay">
      <!-- TODO: Move all text to come from i18n -->
      <div class="overlay-content" @click="absorbClick">
        <div class="title">
          <h1>Impact of Warming</h1>

        </div>
      </div>
    </div>
  </focus-trap>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { FocusTrap } from 'focus-trap-vue';

// eslint-disable-next-line no-unused-vars
import { ISimulatorSettings } from '@/interfaces/settings';

@Options({
  name: 'WarmingOverlay',

  components: { FocusTrap },

  props: { },

  emits: {
    closed(): void { },
  },

  methods: {
    /**
     * Absorb click events to the content to prevent closing it
     */
    absorbClick(clickEvent: MouseEvent) {
      clickEvent.stopPropagation();
    },

    closeOverlay() {
      this.$emit('closed');
    }
  }
})

/**
 * A component that renders an overlay showing simulator settings
 */
export default class WarmingOverlay extends Vue {
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/spacing';


</style>

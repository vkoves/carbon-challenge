<template>
  <focus-trap :returnFocusOnDeactivate="true" initialFocus="#settings-close">
    <div class="overlay" @click="closeOverlay" @keydown.esc="closeOverlay">
      <!-- TODO: Move all text to come from i18n -->
      <div class="overlay-content" @click="absorbClick">
        <div class="title">
          <h1>Settings</h1>

          <button id="settings-close" class="btn -blue -light"
            @click="closeOverlay">
            Close
          </button>
        </div>

        <div class="check-cont">
          <input type="checkbox" id="magic-mode"
            v-model="settings.magicModeEnabled"
            aria-describedby="magic-mode-desc">
          <div>
            <label for="magic-mode">
              <img src="@/assets/magic-wand-black.svg"
                alt="" width="24" height="24">
              Magic Mode
            </label>

            <p id="magic-mode-desc">
              Magic mode lets you use policies that <em>instantly</em> change
              things in the world. Curious what would happen if we instantly
              switched the grid to 100% renewable power? Find out!
            </p>
          </div>
        </div>

        <div class="check-cont">
          <input type="checkbox" id="custom-policies"
            v-model="settings.customPoliciesEnabled"
            aria-describedby="custom-policies-desc">
          <div>
            <label for="custom-policies">
              <img src="@/assets/graph-black.svg"
                alt="" width="24" height="24">
              Custom Policies
            </label>

            <p id="custom-policies-desc">
              Don't settle for the polices we've thought of - make your own
              policies by picking the target emissions reduction for each category
              and the target year!
            </p>
          </div>
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
  name: 'AnalyticsOverlay',

  components: { FocusTrap },

  props: {
    /** The current simulator settings */
    settings: {} as ISimulatorSettings,
  },

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
export default class AnalyticsOverlay extends Vue {
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/spacing';

.check-cont {
  display: flex;
  gap: $standard;
  margin-top: $large;
  margin-bottom: $standard;

  input {
    width: 1.25rem;
    height: 1.25rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: $standard;
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 0.1rem;

    img { display: inline; }
  }

  input, label { cursor: pointer; }
}
</style>

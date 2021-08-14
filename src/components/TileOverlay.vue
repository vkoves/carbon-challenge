<template>
  <div @click="closeOverlay()"
    class="overlay" :class="{ '-open': showingTileMenu }">
    <transition name="slide-fade">
      <section class="sidebar" v-show="showingTileMenu"
        @click="handleSidebarClick">
        <button @click="closeOverlay()" class="btn -small" ref="closeBtn">
          {{ $t('simulator.close') }}
        </button>

        <div v-if="tile">
          <h2>{{ $t(`simulator.tileTypes.${tile.type}`) }}</h2>

          <p v-if="$t(`simulator.tileTypeDescriptions.${tile.type}`)">
            {{ $t(`simulator.tileTypeDescriptions.${tile.type}`) }}
          </p>

          <form @submit="submitOptions">
            <div class="form-inner">
              <div v-for="(option, key, index) in tile.options" :key="key"
                :class="{ '-first': index === 0 }">
                <h3>
                  {{ $t(`simulator.tileOptionTitles.${key}`) }}
                </h3>

                <p class="option-percent">
                  {{ option.weightPrcnt.toFixed(1) }}%
                  {{ $t('simulator.tileOverlay.emissionPrcntLabel') }}
                </p>

                <div class="policies-cont">
                  <div v-for="(policy) in option.policies"
                    :key="policy.key"
                    class="policy-card">
                    <h4>
                      {{ $t(`simulator.tilePolicies.${policy.key}.name`) }}
                    </h4>

                    <p>
                      {{ $t(`simulator.tilePolicies.${policy.key}.description`) }}
                    </p>
                  </div>
                </div>

                <div v-if="false">
                  <!--
                    Render the current value (which is only editable in magic
                    mode, otherwise it is 0) and then allow editing of the
                    target value and year
                  -->
                  <label :for="`${key}-current-val`">
                    {{ $t('simulator.tileOverlay.current') }}:
                  </label>
                  <input type="range"
                    v-model.number="option.current"
                    :id="`${key}-current-val`"
                    name="current-val"
                    min="0" max="100" step="1" disabled>
                  <output class="output" :for="`${key}-current-val`">
                    {{ option.current }}%
                  </output>
                </div>

                <label :for="`${key}-target-val`">
                  {{ $t('simulator.tileOverlay.target') }}:
                </label>
                <input type="range"
                  v-model.number="option.target"
                  :id="`${key}-target-val`"
                  name="target-val"
                  min="0" max="100" step="1">
                <output class="output" :for="`${key}-target-val`">
                  {{ option.target }}%
                </output>

                <label :for="`${key}-target-year-val`">
                  {{ $t('simulator.tileOverlay.targetYear') }}:
                </label>
                <input type="range"
                  v-model.number="option.targetYear"
                  :id="`${key}-target-year-val`"
                  name="target-year-val"
                  min="2025" max="2100" step="1">
                <output class="output" :for="`${key}-target-year-val`">
                  {{ option.targetYear }}
                </output>
              </div>
            </div>

            <div class="btns">
              <button type="button" @click="closeOverlay()"
                class="btn -grey -small">
                Cancel
              </button>
              <button type="submit" class="btn -small">
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// eslint-disable-next-line no-unused-vars
import { TileObj } from '../classes/tile-obj';

const AnimDurationMs = 300;

@Options({
  props: {
    // The tile whose options we're rendering
    tile: {} as TileObj,
  },

  data: () => ({
    isMagicMode: false,
    lastFocusedElem: null,
    showingTileMenu: false,
  }),

  emits: {
    closed(): void { },
    tileUpdated(newTile: TileObj): TileObj { return newTile; },
  },

  methods: {
    closeOverlay() {
      this.showingTileMenu = false;

      // On close of the overlay, refocus the last element
      if (this.lastFocusedElem) {
        this.lastFocusedElem.focus();
      }

      // Emit closed event after fade animation is done
      setTimeout(() => {
        this.$emit('closed');
      }, AnimDurationMs);
    },

    handleSidebarClick(clickEvent: MouseEvent) {
      clickEvent.stopPropagation();
    },

    submitOptions(submitEvent: Event) {
      submitEvent.preventDefault();

      this.$emit('tileUpdated', this.tile);
      this.closeOverlay();
    }
  },

  watch: {
    // On tile changed
    tile: function(newVal) {
      if (!newVal) {
        return;
      }

      this.showingTileMenu = true;

      setTimeout(() => {
        // Focus the first focusable element in the overlay - the close button
        // TODO: Make the overlay trap focus
        this.lastFocusedElem = document.activeElement;

        this.$refs.closeBtn.focus();
      });
    }
  }
})

export default class TileOverlay extends Vue { }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/board';
@import './styles/variables/colors';
@import './styles/variables/spacing';

.overlay {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 2;
  transition: background-color 0.3s;
  background-color: rgba(0, 0, 0, 0.25);
  overflow: hidden;

  &:not(.-open) {
    background-color: transparent;
    pointer-events: none;
  }

  .sidebar {
    padding: 3rem 5rem;
    height: 100%;
    width: 40%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(0.2rem);

    h2, h3 { margin-top: 2rem; }

    .option-percent { margin-top: 0.25rem; }

    .form-inner {
      display: block;
      overflow: auto;
      height: 60vh;
      padding: $large;
      margin-top: $standard;
      background-color: rgba(0, 0, 0, 0.5);

      div.-first h3 { margin-top: 0; }
    }
  }

  .policy-card {
    display: inline-block;
    background: $white;
    color: $text-grey;
    padding: $standard;
    border-radius: 0.5rem;
    margin: $standard 0;
  }

  form {
    label {
      display: block;
      margin-top: $standard;
    }
  }

  .btns {
    display: flex;
    align-items: center;
    margin-top: $standard;

    > button:first-of-type { margin-right: $standard; }
  }
}
</style>


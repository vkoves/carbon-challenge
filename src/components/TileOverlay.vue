<template>
    <div @click="clearSelectedTile()"
      class="overlay" :class="{ '-open': showingTileMenu }">
      <transition name="slide-fade">
        <section class="sidebar" v-show="showingTileMenu"
          @click="handleSidebarClick">
          <button @click="clearSelectedTile()" class="btn" ref="closeBtn">
            {{ $t('simulator.close') }}
          </button>

          <div v-if="tile">
              <h2>{{ $t(`simulator.tileTypes.${tile.type}`) }}</h2>

              <div v-for="(option, key) in tile.options" :key="key">
                  <h3>{{ $t(`simulator.tileOptions.${key}`) }}</h3>

                  <ul>
                    <li>
                      {{ $t('simulator.tileOverlay.current') }}:
                      {{ option.current * 100 + '%' }}
                    </li>
                    <li>
                      {{ $t('simulator.tileOverlay.target') }}:
                      {{ option.target * 100 + '%' }}
                    </li>
                    <li>
                      {{ $t('simulator.tileOverlay.targetYear') }}:
                      {{ option.targetYear }}
                    </li>
                  </ul>
              </div>
          </div>
        </section>
      </transition>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// eslint-disable-next-line no-unused-vars
import { TileObj } from '../simulator';

const AnimDurationMs = 300;

@Options({
  props: {
    // The tile whose options we're rendering
    tile: {} as TileObj,
  },
  data: () => ({
    showingTileMenu: false,
    lastFocusedElem: null,
  }),
  emits: {
    closed(): void { },
  },
  methods: {
    clearSelectedTile() {
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

    h2, h3 { margin-top: 1rem; }
  }
}
</style>


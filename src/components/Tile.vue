<template>
  <!-- Show tile as a <div> if it's empty, <button> if not -->
  <button v-if="tile.type !== TileType.Empty && tile.type !== TileType.Forest"
    class="tile"
    @click="tileSelected()"
    v-bind:style="{ 'animation-delay': animDelay }">
    <div class="above-ground">
      <img v-if="tileImg"
        :class="tile.type"
        :src="require('@/assets/' + tileImg)"
        :alt="$t(`simulator.tileTypes.${tile.type}`)">
      <!-- TODO: Move all non empty tiles to images -->
      <span v-else>
        {{ $t(`simulator.tileTypes.${tile.type}`) }}
      </span>
    </div>
  </button>

  <div v-else class="tile -empty"
    v-bind:style="{ 'animation-delay': animDelay }">
    <div class="above-ground">
      <img v-if="tileImg"
        :class="tile.type"
        :src="require('@/assets/' + tileImg)"
        :alt="$t(`simulator.tileTypes.${tile.type}`)">
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

// eslint-disable-next-line
import { TileObj, TileType } from '../simulator';

@Options({
  name: 'Game',
  props: {
    tile: {} as TileObj,
    tileNum: 0,
  },
  data: () => ({
    // Expose TileType enum to template
    TileType: TileType,
  }),
  emits: {
    selected(newTile: TileObj): TileObj { return newTile; },
  },
  methods: {
    tileSelected(): void {
      this.$emit('selected', this.tile);
    }
  },
  computed: {
    animDelay(): string {
      // The delay in seconds between each fall animation starting
      const AnimationOffsetMs = 100;

      return this.tileNum * (AnimationOffsetMs / 1000) + 's';
    },

    tileImg(): string | null {
      if (this.tile.type === TileType.House) {
        return 'House.svg';
      }
      else if (this.tile.type == TileType.Forest) {
        return 'Forest.svg';
      }

      return null;
    }
  }
})

export default class Game extends Vue { }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/board';
@import './styles/variables/colors';
@import './styles/variables/spacing';

.tile {
  $ground-green: #4caf50;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s, border 0.3s;
  background: $ground-green;
  border: solid 0.25rem lighten($ground-green, 5%);

  // Default the tiles to hidden, and have them fall onto the game board
  opacity: 0;
  animation: 0.2s ease-in fadeIn, 0.4s linear fallIn;
  // Ensure opacity persists after the fadeIn is done
  animation-fill-mode: forwards, none;

  // Fix weird flicker in Chrome
  -webkit-transform: translate3d(0, 0, 0);

  // Show a prominent effect on non-empty tiles being hovered or focused
  &:not(.-empty):hover, &:focus, &.-active {
    outline: none;
    transform: translate(-10%, -10%);
    box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.5);
    border-color: $white;
  }

  // Reverse the game board rotation and skew to straighten above ground
  // assets
  .above-ground {
    transform: skew(-$skewDeg, -$skewDeg) rotate(-$boardRotation);
    width: 85%;
  }

  img {
    width: 100%;

    &.forest {
        position: relative;
        width: 140%;
        left: -20%;
    }
  }
}
</style>

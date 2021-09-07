<template>
  <!-- Show tile as a <div> if it's scenery, <button> if interactive -->
  <button v-if="!tile.isScenery()"
    class="tile"
    :disabled="disabled"
    :style="{ 'animation-delay': animDelay }"
    @click="tileSelected()">
    <div class="above-ground -building">
      <div :class="[
          'tile-img ' + tile.type,
          { '-green': tile.isGreenVariant }
        ]">
        {{ $t(`simulator.tileTypes.${tile.type}`) }}
      </div>
    </div>
  </button>

  <div v-else class="tile -empty"
    :style="{ 'animation-delay': animDelay }">
    <div class="above-ground">
      <!-- Scenery tiles are decorative, so no need for alt text - it'd just be
        noise -->
      <div :class="'tile-img ' + tile.type"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

// eslint-disable-next-line
import { TileObj } from '@/classes/tile-obj';
import { TileType } from '@/interfaces/tile-interfaces';
import { GridWidth } from '@/classes/simulator';

// The delay in seconds between each fall animation starting
const AnimationOffsetMs = 100;

const AnimationOffsetSec = AnimationOffsetMs / 1000;

const GridAnimDelaySec = AnimationOffsetSec * Math.pow(GridWidth, 2);

@Options({
  name: 'Tile',

  props: {
    tile: {} as TileObj,
    tileNum: 0,
    disabled: false,
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
      return this.tileNum * AnimationOffsetSec + 's';
    },

    /**
     * The time we should wait to animate in the above-ground image
     */
    imgAnimDelay(): string {
      return (this.tileNum * AnimationOffsetSec) + GridAnimDelaySec + 's';
    },
  }
})

export default class Tile extends Vue { }
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
  transition: transform 0.3s, box-shadow 0.3s, outline 0.3s;
  background: $ground-green;
  outline: solid 0.25rem lighten($ground-green, 5%);

  // Default the tiles to hidden, and have them fall onto the game board
  opacity: 0;
  animation: 0.2s ease-in fadeIn, 0.4s linear tileFallIn;
  // Ensure opacity persists after the fadeIn is done
  animation-fill-mode: forwards, none;

  // Fix weird flicker in Chrome
  -webkit-transform: translate3d(0, 0, 0);

  // Show a prominent effect on non-empty tiles being hovered or focused
  &:not(.-empty):hover, &:focus, &.-active {
    outline-color: transparent;
    transform: translate(-10%, -10%);
    box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.5);
    outline-color: $white;
  }

  // Fade out images on non-interactive tiles so it's clearly not interactive
  &.-empty .above-ground { opacity: 0.5; }

  .above-ground {
    width: 100%;
    height: 100%;
    transform:
      // Reverse the game board rotation and skew to straighten above ground
      // assets
      skew(-$skewDeg, -$skewDeg) rotate(-$boardRotation)
      // Scale images up compared to what would fit in the tile
      scale(1.1)
      // Move images back a bit on the tile
      translate(0, -10%);

    // Default building images to invisible and have them fall onto the game
    // board after the board animation completes
    &.-building .tile-img {
      opacity: 0;
      animation: 0.2s ease-in fadeIn, 0.4s linear fallIn;
      // Ensure animation effects persist after completion
      animation-fill-mode: forwards;
    }
  }

  .tile-img:not(.empty) {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 0;
    color: transparent;
    margin: auto;
    background-image: url('~@/assets/tile-sheet.png');
    background-size: 300%;
    background-repeat: no-repeat;
    // Default to first tile spot to show rendering error
    background-position: 25% 45%;

    // If a tile is using it's green variant, just switch to the second column
    // of icons
    &.-green { background-position-x: 100%; }

    &.lake {
      background-position: 25% 5%;
      width: 80%;
      height: 80%;
      margin-top: 10%;
      margin-left: 10%;
    }

    &.forest {
      background-position: 100% 5%;
    }

    &.home {
      background-position-y: 22%;
    }

    &.office {
      background-position-y: 42%;
    }

    &.factory {
      background-position-y: 62%;
    }

    &.power {
      background-position-y: 81%;
    }

    &.farm {
      background-position-y: 102%;
      // Move the farm back on the tile
      top: -10%;
      right: -10%;
    }
  }
}
</style>

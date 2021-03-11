<template>
  <!-- Show tile as a <div> if it's empty, <button> if not -->
  <button v-if="tile.type !== TileType.Empty" class="tile" @click="emitTile()">
    <div class="above-ground">
      <img v-if="tile.type === TileType.House"
        src="@/assets/House.svg"
        :alt="$t(`simulator.tileTypes.${tile.type}`)">
      <!-- TODO: Move all non empty tiles to images -->
      <span v-else>
        {{ $t(`simulator.tileTypes.${tile.type}`) }}
      </span>
    </div>
  </button>

  <div class="tile" v-else></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

// eslint-disable-next-line
import { TileObj, TileType } from '../simulator';

@Options({
  name: 'Game',
  props: {
    tile: {} as TileObj,
  },
  data: () => ({
    // Expose TileType enum to template
    TileType: TileType,
  }),
  emits: {
    dataUpdated(newTile: TileObj): TileObj { return newTile; },
  },
  methods: {
    emitTile(): void {
      this.$emit('dataUpdated', this.tile);
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
  margin: 0rem;

  // Fix weird flicker in Chrome
  -webkit-transform: translate3d(0, 0, 0);

  // Show a prominent effect on non-empty tiles being hovered or focused
  &:not(:disabled):hover, &:focus, &.-active {
    outline: none;
    transform: translate(-0.6rem, -0.6rem);
    box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.5);
    border-color: $white;
  }

  // Reverse the game board rotation and skew to straighten above ground
  // assets
  .above-ground {
    transform: skew(-$skewDeg, -$skewDeg) rotate(-$boardRotation);
    width: 85%;
  }

  img { width: 100%; }
}
</style>

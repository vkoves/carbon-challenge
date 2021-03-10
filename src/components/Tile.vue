<template>
  <button class="tile" :disabled="tile.type === TileType.Empty"
    @click="emitTile()">
    <div class="above-ground">
      <span v-if="tile.type !== TileType.Empty">
        {{ $t(`simulator.tileTypes.${tile.type}`) }}
      </span>
    </div>
  </button>
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
  border: solid 5px lighten($ground-green, 5%);
  margin: 1px;

  // Fix weird flicker in Chrome
  -webkit-transform: translate3d(0, 0, 0);

  // Show a prominent effect on non-empty tiles being hovered or focused
  &:not(:disabled):hover, &:focus {
    outline: none;
    transform: translate(-0.6rem, -0.6rem);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
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

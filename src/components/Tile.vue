<template>
  <button class="tile" @click="emitTile()">
    <div class="ground"></div>
    <div class="above-ground">
      <img src="@/assets/test.svg">
    </div>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

// eslint-disable-next-line
import { ITile } from '../simulator';

@Options({
  name: 'Game',
  props: {
    tile: {} as ITile,
  },
  emits: {
    dataUpdated(newTile: ITile): ITile { return newTile; },
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
  border: solid 5px lighten($ground-green, 5%);
  margin: 1px;

  // Fix weird flicker in Chrome
  -webkit-transform: translate3d(0, 0, 0);

  &:hover, &:focus {
    outline: none;
    transform: translate(-10px, -10px);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    border: solid 5px $white;
  }

  .ground {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background: $ground-green;
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

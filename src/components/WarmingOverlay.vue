<template>
  <focus-trap :returnFocusOnDeactivate="true" initialFocus="#warming-close">
    <div class="overlay -warming" @click="closeOverlay" @keydown.esc="closeOverlay">
      <!-- TODO: Move all text to come from i18n -->
      <div class="overlay-content" @click="absorbClick">
        <div class="title">
          <h1>Potential Impacts</h1>

          <button id="warming-close" class="btn -blue -light"
            @click="closeOverlay">
            Close
          </button>
        </div>

        <div>
          <p>
            Climate change poses a wide variety of risks for our world, and each
            of these is reduced as we decrease our emissions and the
            corresponding warming of the planet.
          </p>

          <ul class="bulleted">
            <li>
              <strong>Food and water scarcity</strong> - climate change will
              impact agricultural land and crop yields as well as cause shifts
              in the availability of freshwater, leading to decreased food
              availability and water scarcity.
            </li>
            <li>
              <strong>Devastating sea level rise</strong> -
              rising sea levels will impact low-lying communities through
              saltwater intrusion (when groundwater is contaminated by
              saltwater, devastating farming and reducing drinkable water)
              flooding and infrastructure damage.
            </li>
            <li>
              <strong>More extreme weather</strong> - as the climate changes and
              previously stable weather patterns break down, we'll see more heat
              waves, droughts, hurricanes, and other extreme weather events,
              causing losses both in property and lives.
            </li>
            <li>
              <strong>Increased disease risk</strong> - some diseases will
              expand their range around the world as their host creatures (like
              mosquitoes) expand their range in a warming world.
            </li>
            <li>
              <strong>Mass extinctions</strong> - in a warming world, the
              climate of an ecosystem can shift faster than plants and animals
              can either adapt or migrate, leading to die-offs of large numbers
              of species. The oceans are also heavily impacted due to increases
              in ocean temperature and ocean acidification.
            </li>
          </ul>

          <p>
            Primary source: <a href="https://www.ipcc.ch/sr15/chapter/chapter-3/">
            IPPC Special Report - Chapter 3</a>
          </p>
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

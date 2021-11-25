<template>
  <focus-trap :returnFocusOnDeactivate="true" initialFocus="#warming-close">
    <div class="overlay -warming" @click="closeOverlay" @keydown.esc="closeOverlay">
      <!-- TODO: Move all text to come from i18n -->
      <div class="overlay-content" @click="absorbClick">
        <div class="title">
          <h1>Your Policies</h1>

          <button id="warming-close" class="btn -blue -light"
            @click="closeOverlay">
            Close
          </button>
        </div>

        <!-- Loop through tiles and fetch their policy via -->
        <ul v-if="selectedPolicies.length > 0">
          <li v-for="(policy) in selectedPolicies" v-bind:key="policy.key" class="policy">
            <h2>
                <img v-if="policy.isMagic"
                  src="@/assets/magic-wand-black.svg"
                  class="icon -magic-wand"
                  alt="Magic" width="24" height="24">

                {{ $t(`simulator.tilePolicies.${policy.key}.name`) }}
            </h2>

            <div class="emission-change" v-if="policyEmissions[policy.key]">
              {{ policyEmissions[policy.key] }} Gigatonnes CO<sub>2</sub>
            </div>

            <p>
              {{ $t(`simulator.tilePolicies.${policy.key}.description`) }}
            </p>
          </li>
        </ul>
        <p v-else class="empty">
          You haven't selected any policies yet!
        </p>
      </div>
    </div>
  </focus-trap>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { FocusTrap } from 'focus-trap-vue';

import { TilePolicyKey } from '@/constants/tile-policies';
// eslint-disable-next-line no-unused-vars
import { IOption } from '@/interfaces/tile-interfaces';
// eslint-disable-next-line no-unused-vars
import { TileObj } from '@/classes/tile-obj';
import { Simulator } from '@/classes/simulator';

@Options({
  name: 'PolicyOverlay',

  components: { FocusTrap },

  data: () => ({
    selectedPolicies: [],
    // An object mapping policy keys to integers of emission reductions in
    // Gigatonnes
    policyEmissions: {},
  }),


  props: {
    tiles: [],
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
  },


  watch: {
    // On tiles changed (likely options updated) recalculate temperature
    tiles: function(newVal) {
      if (!newVal) {
        return;
      }
    }
  },

  mounted(): void {
    this.tiles.forEach((tile: TileObj) => {
      if (!tile.options) { return; }

      Object.values(tile.options).forEach((tileOption: IOption) => {
        if (tileOption.policies && tileOption.currPolicyKey !== TilePolicyKey.None) {
          const policy = tileOption.policies.find(policy => policy.key === tileOption.currPolicyKey);

          if (!policy) { return; }

          this.selectedPolicies.push(policy);

          const policyEmissionDelta = Simulator.getPolicyEmissionsDelta({
            current: 0,
            target: policy.target as number,
            targetYear: policy.targetYear as number,
            weightPrcnt: tileOption.weightPrcnt,
            maxCO2Sequestered: tileOption.maxCO2Sequestered,
          }).total;

          // Round off to the nearest giggatonne, since this is for the UI
          this.policyEmissions[policy.key] = Math.round(policyEmissionDelta);
        }
      });
    });
  }
})

/**
 * A component that renders an overlay showing what policies the user has
 * selected, typically once they hit the 1.5°C mark
 */
export default class PolicyOverlay extends Vue {

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';

h1 { margin-bottom: $standard; }

ul {
  max-height: 70vh;
  overflow-y: scroll;
  padding-right: $standard;
  margin-top: $standard;
  background: $light-grey;
  padding: $standard;
}

.policy {
  background-color: $white;
  padding: $m-large;
  border-left: solid 0.25rem $dark-blue;
  border-radius: 0.25rem;
  box-shadow: 0 0.1rem 0.25rem $shadow-medium;

  + .policy { margin-top: $m-large; }

  h2 {
    font-size: 1.25rem;
    margin-bottom: $tiny;
  }
  .emission-change {
    font-weight: 500;
    font-size: 0.875rem;
  }
  p { margin-top: $small; }
}

p.empty { margin-top: 0; }
</style>

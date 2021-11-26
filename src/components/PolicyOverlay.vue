<template>
  <focus-trap :returnFocusOnDeactivate="true" initialFocus="#policy-close">
    <div class="overlay -policy" @click="closeOverlay" @keydown.esc="closeOverlay">
      <!-- TODO: Move all text to come from i18n -->
      <div class="overlay-content" @click="absorbClick">
        <div class="title">
          <h1 v-if="successState">Great Work, You Did It!</h1>
          <h1 v-else>Your Policies</h1>

          <button id="policy-close" class="btn -blue -light"
            @click="closeOverlay">
            Close
          </button>
        </div>

        <p v-if="successState">
          <strong>You've reached less than 1.5°C of warming!</strong>
          The policies you chose will prevent the worst impacts of climate
          change. Review your selections below, and share what you learned from
          the Carbon Challenge with your friends and family!
        </p>


        <div v-if="selectedPolicies.length > 0" class="temp-info">
          <h2>Outcomes</h2>

          <p>
            <strong>
              {{ estDegWarming.toFixed(2) }}°C Warming by 2100 Projected -
            </strong>

            <span v-if="estDegWarming < 1.5" class="temp-info">
              Your policy choices will likely avert the largest impacts of
              climate change. Awesome work!
            </span>
            <span v-else-if="estDegWarming < 2" class="temp-info">
              Almost there! Your policy choices are a great step, but anything
              over 1.5°C of warming can cause serious problems. Are there more
              policies that would help?
            </span>
            <span v-else class="temp-info">
              That looks like a dangerously hot future! Are there more policies
              you could select to get closer to 1.5°C of warming?
            </span>
          </p>

          <p v-if="estDegWarming > 1.5">
            <strong>Tip:</strong> Check out Analytics overlay to learn what
            tiles are the largest source of emissions - then check out policies
            available on those tiles!
          </p>
        </div>

        <h2 v-if="selectedPolicies.length > 0">Policy Selections</h2>

        <!-- Show warnings if magic mode or custom policies are set -->
        <div v-if="settings.magicModeEnabled" class="warning">
          <img src="@/assets/magic-wand-black.svg"
            class="setting-indicator -magic-mode"
            alt="" width="24" height="24">
          Magic mode is enabled
        </div>

        <div v-if="settings.customPoliciesEnabled" class="warning">
          <img src="@/assets/graph-black.svg"
            class="setting-indicator -cust-policies"
            alt="" width="24" height="24">
          Custom policies are enabled
        </div>

        <!-- Loop through tiles and list their selected policies. Uses
            tabindex="0" to ensure keyboard users can scroll it -->
        <ul v-if="selectedPolicies.length > 0" tabindex="0">
          <li v-for="(policy) in selectedPolicies" v-bind:key="policy.key" class="policy">
            <h3>
                <img v-if="policy.isMagic"
                  src="@/assets/magic-wand-black.svg"
                  class="icon -magic-wand"
                  alt="Magic" width="18" height="18">

                {{ $t(`simulator.tilePolicies.${policy.key}.name`) }}
            </h3>

            <div class="emission-change" v-if="policyEmissions[policy.key]">
              {{ policyEmissions[policy.key] }} Gigatonnes CO<sub>2</sub>
            </div>

            <p class="policy-desc">
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
import { ISimulatorSettings } from '@/interfaces/settings';
// eslint-disable-next-line no-unused-vars
import { TileObj } from '@/classes/tile-obj';
import { Simulator } from '@/classes/simulator';

@Options({
  name: 'PolicyOverlay',

  components: { FocusTrap },

  data: () => ({
    // An array of the selected policies combined from across all times
    selectedPolicies: [],

    // An object mapping policy keys to integers of emission reductions in
    // Gigatonnes
    policyEmissions: {},

    // The estimated degrees of warming with the current tiles
    estDegWarming: 0,
  }),


  props: {
    /** The current tiles, with their policy selections */
    tiles: [],

    /** The current simulator settings */
    settings: {} as ISimulatorSettings,

    /** Whether this modal is being shown as the end-game screen */
    successState: false,
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

  mounted(): void {
    // Fetch the estimated warming with the current setup to see if we should
    // show success text
    this.estDegWarming = Simulator.getThermometerDegrees(this.tiles);

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

// Since this is a very tall modal, make sure it's fully vertically centered
// rather than skewed to the top and ensure it never fills the screen
.overlay-content {
  margin: 0;
  max-height: 90vh;
  overflow-y: auto;
}

h2 { margin: $standard 0; }

p.temp {
  font-weight: bold;
  font-size: 1.1rem;
}

p.temp-info { margin-top: $small; }

.warning {
  display: inline-flex;
  align-items: center;
  gap: $small;
  font-weight: bold;
  border-radius: 0.25rem;
  margin-right: $standard;
}

ul {
  max-height: 40vh;
  overflow-y: scroll;
  padding-right: $standard;
  margin-top: $standard;
  background: $light-grey;
  border: solid 1px $light-grey;
  padding: $standard;
}

.policy {
  background-color: $white;
  padding: $standard;
  border-left: solid 0.25rem $dark-blue;
  border-radius: 0.25rem;
  box-shadow: 0 0.1rem 0.25rem $shadow-medium;

  + .policy { margin-top: $standard; }

  h3 {
    font-size: 1rem;
    margin-bottom: $tiny;

    img { margin-right: $tiny; }
  }

  .emission-change {
    font-weight: 500;
    font-size: 0.875rem;
  }

  .policy-desc {
    margin-top: $small;
    font-size: 0.875rem;
  }
}

/**
 * Mobile styling - make the whole modal scroll rather than the policies list
 */
@media (max-width: $mobile-max-width) {
  ul {
    max-height: none;
    overflow-y: hidden;
  }
}
</style>

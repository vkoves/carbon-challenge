<template>
  <div @click="closeOverlay" @keydown.esc="closeOverlay"
    class="overlay" :class="{ '-open': showingTileMenu }">
    <transition name="slide-fade">
      <section class="sidebar" v-show="showingTileMenu"
        @click="handleSidebarClick">
        <focus-trap :returnFocusOnDeactivate="true" v-model:active="trapFocus" initialFocus="#sidebar-close">
          <form @submit="submitOptions">
            <button id="sidebar-close" type="button" @click="closeOverlay" class="btn -small">
              {{ $t('simulator.close') }}
            </button>

            <template v-if="tile">
              <h2>{{ $t(`simulator.tileTypes.${tile.type}`) }}</h2>

              <p v-if="$t(`simulator.tileTypeDescriptions.${tile.type}`)">
                {{ $t(`simulator.tileTypeDescriptions.${tile.type}`) }}
              </p>

              <div class="form-inner">
                <div v-for="(option, optKey, index) in tile.options" :key="optKey"
                  :class="{ '-first': index === 0 }">
                  <div class="title-cont">
                    <h3>
                      {{ $t(`simulator.tileOptionTitles.${optKey}`) }}
                    </h3>

                    <span class="option-percent">
                      {{ option.weightPrcnt.toFixed(1) }}%
                      {{ $t('simulator.tileOverlay.emissionPrcntLabel') }}
                      CO<sub>2</sub>
                    </span>
                  </div>

                  <fieldset>
                    <legend>
                      {{ $t('simulator.tileOverlay.policiesLabel') }}
                    </legend>

                    <!-- Loop through available policies for the option -->
                    <template v-for="(policy) in option.policies">
                      <!-- Only render the "Custom" policy if we're allowing that
                        and only render magic policies if magic mode is on -->
                      <div v-if="(policy.key !== TilePolicyKey.Custom
                        || settings.customPoliciesEnabled)
                        && (!policy.isMagic || settings.magicModeEnabled)"
                        class="policy-card"
                        :class="{ '-active': option.currPolicyKey === policy.key  }"
                        :key="policy.key"
                        @click="policySelected(policy.key, optKey)">

                        <input type="radio"
                          :name="optKey"
                          :id="`policy-radio-${optKey}-${policy.key}`"
                          :checked="option.currPolicyKey === policy.key"
                          @change="policySelected(policy.key, optKey)">

                        <div class="label-cont">
                          <label :for="`policy-radio-${optKey}-${policy.key}`">
                              <img v-if="policy.isMagic"
                                src="@/assets/magic-wand-black.svg"
                                class="icon -magic-wand"
                                alt="Magic" width="24" height="24">

                              {{ $t(`simulator.tilePolicies.${policy.key}.name`) }}
                          </label>

                          <div class="emission-change" v-if="policyEmissions[policy.key]">
                            {{ policyEmissions[policy.key] }} Gigatonnes CO<sub>2</sub>
                          </div>

                          <!-- Only show the description of the current policy,
                            if it's not "None" -->
                          <p v-if="option.currPolicyKey === policy.key && policy.key !== TilePolicyKey.None">
                            {{ $t(`simulator.tilePolicies.${policy.key}.description`) }}
                          </p>
                        </div>

                        <!-- Show the custom policy controls if this is the custom
                          policy and it is selected -->
                        <CustomPolicyControls
                          v-if="policy.key === TilePolicyKey.Custom
                            && option.currPolicyKey === TilePolicyKey.Custom"
                          :option="option"
                          :optionKey="optKey"
                          :isMagicMode="settings.magicModeEnabled">
                        </CustomPolicyControls>
                      </div>
                    </template>
                  </fieldset>
                </div>
              </div>
            </template>
          </form>
        </focus-trap>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { FocusTrap } from 'focus-trap-vue';

import { TilePolicyKey } from '@/constants/tile-policies';
// eslint-disable-next-line no-unused-vars
import { IOption, IOptionPolicy, TileOption } from '@/interfaces/tile-interfaces';
// eslint-disable-next-line no-unused-vars
import { ISimulatorSettings } from '@/interfaces/settings';
// eslint-disable-next-line no-unused-vars
import { TileObj } from '@/classes/tile-obj';
// eslint-disable-next-line no-unused-vars
import { IPolicyDeltaEstimates, Simulator } from '@/classes/simulator';

import CustomPolicyControls from './CustomPolicyControls.vue';

const AnimDurationMs = 300;

@Options({
  props: {
    /**  The tile whose options we're rendering */
    tile: {} as TileObj,

    /** The current simulator settings */
    settings: {} as ISimulatorSettings,

    /** Whether Escape was pressed globally, which should close this overlay */
    escPressed: false,
  },

  components: {
    CustomPolicyControls,
    FocusTrap,
  },

  data: () => ({
    showingTileMenu: false,
    trapFocus: false,

    policyEmissions: {} as IPolicyDeltaEstimates,

    // Expose constants/enums to the template
    TilePolicyKey: TilePolicyKey,
  }),

  emits: {
    closed(): void { },
    tileUpdated(newTile: TileObj): TileObj { return newTile; },
  },

  methods: {
    closeOverlay() {
      this.showingTileMenu = false;
      this.trapFocus = false;

      // Emit closed event after fade animation is done
      setTimeout(() => {
        this.$emit('closed');
      }, AnimDurationMs);
    },

    /**
     * Absorb click events to the sidebar content to prevent closing it
     */
    handleSidebarClick(clickEvent: MouseEvent) {
      clickEvent.stopPropagation();
    },

    policySelected(policyKey: TilePolicyKey, optionKey: TileOption) {
      const tileOption: IOption = this.tile.options[optionKey];

      tileOption.currPolicyKey = policyKey;

      // Find the select policy among the policies of the current tile option
      const selectedPolicy = (tileOption.policies || [])
          .find((policy: IOptionPolicy) => policy.key === policyKey);

      // The custom policy doesn't have a target or targetYear (it mutates the
      // tile option directly) so verify the selectedPolicy has one before
      // overriding the tile option
      if (selectedPolicy
        && typeof selectedPolicy.target === 'number'
        && typeof selectedPolicy.targetYear === 'number') {
        tileOption.target = selectedPolicy.target;
        tileOption.targetYear = selectedPolicy.targetYear;
      }

      this.$emit('tileUpdated', this.tile);
    }
  },

  watch: {
    // On tile changed
    tile: function(newVal) {
      if (!newVal) {
        return;
      }

      this.policyEmissions
        = Simulator.calculateAllPolicyEmissionDeltas(this.tile);

      this.showingTileMenu = true;

      // Enable focus trap once the animation is done
      setTimeout(() => {
        this.trapFocus = true;
      }, AnimDurationMs);
    },

    // Close the overlay if escape was pressed in the parent
    escPressed: function(isPressed: boolean) {
      if (isPressed) {
        this.closeOverlay();
      }
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
  z-index: 11; // Draw over <header> on mobile
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
    min-width: 40%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(0.2rem);

    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 100%;
      width: 32rem;
    }

    h2, h3 { margin-top: $large; }

    .title-cont {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }

    .option-percent {
      margin-left: $small;
      flex-shrink: 0;
    }

    .form-inner {
      display: block;
      overflow: auto;
      width: 100%;
      padding: $large;
      margin-top: $standard;
      background-color: rgba(0, 0, 0, 0.5);
      box-sizing: border-box;

      div.-first h3 { margin-top: 0; }
    }
  }

  fieldset { margin-top: $standard; }

  .policy-card {
    display: flex;
    flex-wrap: wrap;
    background: $white;
    color: $text-grey;
    padding: $standard;
    border-radius: 0.5rem;
    margin: $standard 0;
    border-left: solid 0.75rem $light-grey;
    transition: border-color 0.3s;

    &:hover { border-color: $mid-grey; }

    &.-active { border-color: $dark-blue; }

    // Give the policy card a glow when it's focused
    &:focus-within {
     box-shadow: 0 0 $standard $tiny $white;
    }

    // Make it clear that the whole policy card is clickable with a cursor
    &, input, label {
      cursor: pointer;
    }

    input[type="radio"], label {
      display: inline-block;
    }

    input[type="radio"] {
      margin-left: 0;
      flex-shrink: 0;

      &:focus { outline: none; }
    }

    .label-cont {
      margin-top: 0;
      margin-left: $small;
      width: calc(100% - 1.5rem);

      label {
        display: flex;
        align-items: center;
        font-weight: bold;
        gap: $small;
      }

      .icon {
        &.-magic-wand {
          position: relative;
          top: -0.25rem;
        }
      }

      .emission-change {
        font-weight: 500;
        margin-top: $tiny;
        font-size: 0.875rem;
      }

      p {
        margin-top: $small;
        font-size: 0.875rem;
      }
    }

    .custom-policy-cont {
      margin-left: 1.25rem;
      width: 100%;
    }
  }
}

@media (max-width: $mobile-max-width) {
  // Make sidebar full screen on mobile
  .overlay .sidebar {
    min-width: 0;
    width: 100%;
    padding: $standard $large;

    .title-cont {
      flex-direction: column;
      align-items: flex-start;

      .option-percent { margin-left: 0; }
    }

    form { width: 100%; }
  }
}
</style>


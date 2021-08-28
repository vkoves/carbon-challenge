<template>
  <div @click="closeOverlay()"
    class="overlay" :class="{ '-open': showingTileMenu }">
    <transition name="slide-fade">
      <section class="sidebar" v-show="showingTileMenu"
        @click="handleSidebarClick">
        <focus-trap :returnFocusOnDeactivate="true" v-model:active="trapFocus" initialFocus="#sidebar-close">
          <div>
            <button id="sidebar-close" @click="closeOverlay()" class="btn -small">
              {{ $t('simulator.close') }}
            </button>

            <div v-if="tile">
              <h2>{{ $t(`simulator.tileTypes.${tile.type}`) }}</h2>

              <p v-if="$t(`simulator.tileTypeDescriptions.${tile.type}`)">
                {{ $t(`simulator.tileTypeDescriptions.${tile.type}`) }}
              </p>

              <form @submit="submitOptions">
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
                        <!-- Only render the "Custom" policy if we're allowing that -->
                        <div v-if="policy.key !== TilePolicyKey.Custom || (settings.customPoliciesEnabled)"
                          class="policy-card"
                          :class="{ '-active': option.currPolicyKey === policy.key  }"
                          :key="policy.key"
                          @click="policySelected(policy.key, optKey)">
                          <input type="radio"
                            :name="optKey"
                            :id="`policy-radio-${optKey}-${policy.key}`"
                            :checked="option.currPolicyKey === policy.key"
                            @change="policySelected(policy.key, optKey)">
                          <label :for="`policy-radio-${optKey}-${policy.key}`">
                            <span class="name">
                              <img v-if="policy.isMagic"
                                src="@/assets/magic-wand-black.svg"
                                class="icon -magic-wand"
                                alt="Magic" width="24" height="24">

                              {{ $t(`simulator.tilePolicies.${policy.key}.name`) }}
                            </span>

                            <p>
                              {{ $t(`simulator.tilePolicies.${policy.key}.description`) }}
                            </p>
                          </label>

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

                <div class="btns">
                  <button type="button" @click="cancel()"
                    class="btn -grey -small">
                    Cancel
                  </button>
                  <button type="submit" class="btn -small">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </focus-trap>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { FocusTrap } from 'focus-trap-vue';

// eslint-disable-next-line no-unused-vars
import { TileObj } from '@/classes/tile-obj';
import { TilePolicyKey } from '@/constants/tile-policies';
// eslint-disable-next-line no-unused-vars
import { IOption, IOptionPolicy, TileOption } from '@/interfaces/tile-interfaces';
// eslint-disable-next-line no-unused-vars
import { ISimulatorSettings } from '@/interfaces/settings';

import CustomPolicyControls from './CustomPolicyControls.vue';

const AnimDurationMs = 300;

@Options({
  props: {
    /**  The tile whose options we're rendering */
    tile: {} as TileObj,

    /** The current simulator settings */
    settings: {} as ISimulatorSettings,
  },

  components: {
    CustomPolicyControls,
    FocusTrap,
  },

  data: () => ({
    showingTileMenu: false,
    trapFocus: false,

    // Expose constants/enums to the template
    TilePolicyKey: TilePolicyKey,
  }),

  emits: {
    closed(tileId: number): number { return tileId; },
    tileUpdated(newTile: TileObj): TileObj { return newTile; },
  },

  methods: {
    // Reset this tile to its previous state and then close the overlay
    cancel() {
      // TODO: Make cancel reset tile values

      this.closeOverlay();
    },

    closeOverlay() {
      this.showingTileMenu = false;
      this.trapFocus = false;

      // Emit closed event after fade animation is done
      setTimeout(() => {
        this.$emit('closed', this.tile.id);
      }, AnimDurationMs);
    },

    handleSidebarClick(clickEvent: MouseEvent) {
      clickEvent.stopPropagation();
    },

    submitOptions(submitEvent: Event) {
      submitEvent.preventDefault();

      this.$emit('tileUpdated', this.tile);
      this.closeOverlay();
    },

    policySelected(policyKey: TilePolicyKey, optionKey: TileOption) {
      const tileOption: IOption = this.tile.options[optionKey];

      tileOption.currPolicyKey = policyKey;

      // Find the select policy among the policies of the current tile option
      const selectedPolicy = (tileOption.policies || [])
          .find((policy: IOptionPolicy) => policy.key === policyKey);

      // The custom policy doesn't have a target or targetYear, so verify the
      // selectedPolicy has one
      if (selectedPolicy
        && typeof selectedPolicy.target === 'number'
        && typeof selectedPolicy.targetYear === 'number') {
        tileOption.target = selectedPolicy.target;
        tileOption.targetYear = selectedPolicy.targetYear;
      }
    }
  },

  watch: {
    // On tile changed
    tile: function(newVal) {
      if (!newVal) {
        return;
      }

      this.showingTileMenu = true;

      // Enable focus trap once the animation is done
      setTimeout(() => {
        this.trapFocus = true;
      }, AnimDurationMs);
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
    min-width: 37.5rem;
    width: 40%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(0.2rem);

    h2, h3 { margin-top: $large; }

    .title-cont {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }

    .option-percent {
      margin-left: $small;
    }

    .form-inner {
      display: block;
      overflow: auto;
      max-height: 62vh;
      padding: $large;
      margin-top: $standard;
      background-color: rgba(0, 0, 0, 0.5);

      div.-first h3 { margin-top: 0; }
    }
  }

  fieldset { margin-top: $standard; }

  .policy-card {
    background: $white;
    color: $text-grey-light;
    padding: $standard;
    border-radius: 0.5rem;
    margin: $standard 0;
    border-left: solid 0.75rem $light-grey;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;

    &:hover {
      background-color: $light-grey;
      border-color: $mid-grey;
      color: $text-grey;
    }

    &.-active {
      border-color: $dark-blue;
      color: $text-grey;
    }

    &:hover, &.-active {
      label .icon { opacity: 1; }
    }

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
      float: left;

      &:focus { outline: none; }
    }

    label {
      margin-top: 0;
      margin-left: $small;
      width: calc(100% - 1.5rem);

      .name {
        display: flex;
        align-items: center;
        font-weight: bold;
        gap: $small;
      }

      .icon {
        // Fade out all icons from black to make them roughly match the grey
        opacity: 0.5;
        transition: opacity 0.3s;

        &.-magic-wand {
          position: relative;
          top: -0.25rem;
        }
      }

      p {
        margin-top: $tiny;
        font-size: 0.875rem;
      }
    }

    .custom-policy-cont { margin-left: 1.25rem; }
  }

  .btns {
    display: flex;
    align-items: center;
    margin-top: $standard;

    > button:first-of-type { margin-right: $standard; }
  }
}

@media (max-width: $mobile-max-width) {
  // Make sidebar full screen on mobile
  .overlay .sidebar {
    min-width: 0;
    width: 100%;
    padding: $standard $large;

    .title-cont { flex-direction: column; }
    .form-inner { max-height: 50vh; }
  }
}
</style>


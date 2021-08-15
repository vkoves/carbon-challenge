<template>
  <div class="custom-policy-cont">
    <div v-if="isMagicMode">
      <!--
        Render the current value (which is only editable in magic
        mode, otherwise it is 0) and then allow editing of the
        target value and year
      -->
      <label :for="`${optionKey}-current-val`">
        {{ $t('simulator.tileOverlay.current') }}:
      </label>
      <input type="range"
        v-model.number="option.current"
        :id="`${optionKey}-current-val`"
        name="current-val"
        min="0" max="100" step="1" disabled>
      <output class="output" :for="`${optionKey}-current-val`">
        {{ option.current }}%
      </output>
    </div>

      <label :for="`${optionKey}-target-val`">
        {{ $t('simulator.tileOverlay.target') }}:
      </label>
      <input type="range"
        v-model.number="option.target"
        :id="`${optionKey}-target-val`"
        name="target-val"
        min="0" max="100" step="1">
      <output class="output" :for="`${optionKey}-target-val`">
        {{ option.target }}%
      </output>

      <label :for="`${optionKey}-target-year-val`">
        {{ $t('simulator.tileOverlay.targetYear') }}:
      </label>
      <input type="range"
        v-model.number="option.targetYear"
        :id="`${optionKey}-target-year-val`"
        name="target-year-val"
        min="2025" max="2100" step="1">
      <output class="output" :for="`${optionKey}-target-year-val`">
        {{ option.targetYear }}
      </output>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// eslint-disable-next-line no-unused-vars
import { IOption } from '@/interfaces/tile-interfaces';

@Options({
  props: {
    /**
     * The tile option we're customizing. This component will directly modify
     * it's target and targetYear values.
     */
    option: {} as IOption,

    /**
     * The TileOption enum value we're showing
     */
    optionKey: String,

    /**
     * Whether magic mode is enabled, which lets the user change the current
     * emissions reduction along with targets
     */
    isMagicMode: Boolean,
  },
})

export default class CustomPolicyControls extends Vue { }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/spacing';

label {
  display: block;
  margin-top: $standard;
}
</style>

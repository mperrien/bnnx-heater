<template>
  <div class="targetTemperature">
    <div class="targetTemperature__circle">
      <div class="targetTemperature__bound targetTemperature__bound--min"></div>
      <div class="targetTemperature__bound targetTemperature__bound--max"></div>
      <div class="targetTemperature__target" :style="`transform: rotate(${targetAngle}deg);`"></div>
    </div>
    <div class="targetTemperature__value">{{ displayedTarget }}°C</div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";

const props = defineProps<{
  min: number;
  max: number;
  target: number;
}>();
const { min, max, target } = toRefs(props);

const displayedTarget = computed<number>(() => {
  if (target.value > max.value) {
    return max.value.toFixed(1);
  } else if (target.value < min.value) {
    return min.value.toFixed(1);
  } else {
    // I know from experience that users really like being able to set
    // a very precise temperature. So we always display on decimal place!
    return target.value.toFixed(1);
  }
});

const targetAngle = computed<number>(() => {
  /* First, we compute the position between 0 and 1 */
  const position: number = (displayedTarget.value - min.value) / (max.value - min.value);
  /* Assign an angle. We have 280 degrees between -140deg and +140deg bounds */
  const angle: number = position * 280;
  /* Set angle from a 0/280deg value to -140/+140deg value */
  const angleWithBounds: number = angle - 140;
  return angleWithBounds;
});
</script>

<style scoped>
.targetTemperature {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-small);
  height: 20rem;
  width: 20rem;
  padding: var(--space-small);

  background-color: var(--grey-200);
  border-radius: 3rem;
  box-shadow: var(--box-shadow-diffuse);

  .targetTemperature__circle {
    position: relative;

    height: 8rem;
    width: 8rem;

    background-color: var(--grey-100);
    border: 0.4rem solid var(--grey-500);
    border-radius: 50%;
  }

  .targetTemperature__bound {
    position: absolute;

    height: 100%;
    width: 100%;

    &::before {
      content: "";

      position: absolute;
      top: -1.2rem;
      left: calc(50% - 0.2rem);

      display: block;
      height: 1.2rem;
      width: 0.4rem;

      background-color: var(--blue);
    }
  }

  .targetTemperature__bound--min {
    transform: rotate(-140deg);
  }

  .targetTemperature__bound--max {
    transform: rotate(140deg);
  }

  .targetTemperature__target {
    position: absolute;

    height: 100%;
    width: 100%;

    transition: transform 0.3s ease-in-out;

    &::before {
      content: "";

      position: absolute;
      top: 0;
      left: calc(50% - 0.2rem);

      display: block;
      height: 2.4rem;
      width: 0.4rem;

      background-color: var(--blue);
    }
  }

  .targetTemperature__value {
    font-variant-numeric: tabular-nums;
  }
}
</style>

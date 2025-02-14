<template>
  <main>
    <h1>Target Temperature</h1>
    <TargetTemperature :min="min" :max="max" :target="target" />
    <div class="settings">
      <form>
        <h2>Settings</h2>
        <div class="inputWrapper">
          <label for="min">Min</label>
          <input type="number" id="min" name="min" v-model="min" min="4" max="20" />
        </div>
        <div class="inputWrapper">
          <label for="max">Max</label>
          <input type="number" id="max" name="max" v-model="max" min="21" max="32" />
        </div>
        <div class="inputWrapper">
          <label for="target">Target</label>
          <input
            type="number"
            id="target"
            name="target"
            v-model="target"
            :min="min"
            :max="max"
            step="0.1"
          />
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TargetTemperature from "@/components/TargetTemperature.vue";

const min = ref<number>(4);
const max = ref<number>(32);
const target = ref<number>(19);
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-medium);
  min-height: 100vh;
  width: 100%;

  h1 {
    color: var(--text-color-dim);
    font-size: 1.6rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .settings {
    position: absolute;
    top: var(--space-small);
    right: var(--space-small);

    padding: var(--space-small);

    border-radius: 1.2rem;
    box-shadow: var(--box-shadow-diffuse);

    h2 {
      margin-bottom: var(--space-small);

      color: var(--text-color-dim);
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 1.1;
      text-transform: uppercase;
    }

    .inputWrapper + .inputWrapper {
      margin-top: var(--space-small);
    }

    .inputWrapper {
      display: flex;

      label {
        padding-right: 0.6rem;
        width: 6rem;

        font-size: 1.4rem;
      }

      input {
        width: 8rem;
      }
    }
  }
}
</style>

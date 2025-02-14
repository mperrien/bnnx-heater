import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import TargetTemperature from "../TargetTemperature.vue";

describe("TargetTemperature", () => {
  it("renders properly", () => {
    const wrapper = mount(TargetTemperature, { props: { min: 4, max: 27, target: 19 } });
    expect(wrapper.text()).toContain("19°C");
  });
  it("doesn't display a target too high", () => {
    const wrapper = mount(TargetTemperature, { props: { min: 4, max: 27, target: 29 } });
    expect(wrapper.text()).toContain("27°C");
  });
  it("doesn't display a target too low", () => {
    const wrapper = mount(TargetTemperature, { props: { min: 4, max: 27, target: 0 } });
    expect(wrapper.text()).toContain("4°C");
  });
  it("gets the right angle when target===min", () => {
    const wrapper = mount(TargetTemperature, { props: { min: 4, max: 27, target: 4 } });
    expect(wrapper.html()).toContain("transform: rotate(-140deg)");
  });
  it("gets the right angle when target===max", () => {
    const wrapper = mount(TargetTemperature, { props: { min: 4, max: 27, target: 27 } });
    expect(wrapper.html()).toContain("transform: rotate(140deg)");
  });
  it("gets the right angle", () => {
    const wrapper = mount(TargetTemperature, { props: { min: 4, max: 27, target: 19 } });
    expect(wrapper.html()).toContain("transform: rotate(42.6");
  });
});

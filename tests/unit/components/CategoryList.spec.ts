import { mount, shallowMount } from "@vue/test-utils";
import CategoryList from "@/components/CategoryList.vue";

jest.mock("axios");

describe("CategoryList.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(CategoryList);
    expect(wrapper.element).toMatchSnapshot();
  });
});

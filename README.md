# vue-data-scooper - A Vue.js plugin

[![npm version](https://badge.fury.io/js/vue-data-scooper.svg)](https://badge.fury.io/js/vue-data-scooper)

## Synopsis

As the official Vue.js document says:

> `v-model` will ignore the initial `value`, `checked` or `selected` attributes
> found on any form elements.
> (https://vuejs.org/v2/guide/forms.html)

However, you can initialize the Vue instance data from form elements with this plugin.

## Usage

Suppose that we have the following `<form>` element within a HTML document:

```html
<form id="customer-form">
  <input type="text" v-model="customer.name" name="customer[name]" value="john">
  <input type="radio" v-model="customer.plan" name="customer[plan]" value="A" checked>
  <input type="radio" v-model="customer.plan" name="customer[plan]" value="B">
  <input type="hidden" name="customer[approved]" value="0">
  <input type="checkbox" v-model="customer.approved" name="customer[approved]"
    value="1" checked>
  <select v-model="customer.gender" name="customer[gender]">
    <option value="" selected>Unspecified</option>
    <option value="female">Female</option>
    <option value="male">Male</option>
  </select>
  <textarea v-model="customer.remarks" name="customer[remarks]">Good</textarea>
</form>
```

Then, we can mount a Vue instance on it.

```javascript
import Vue from 'vue/dist/vue.esm'
import VueDataScooper from "vue-data-scooper"

Vue.use(VueDataScooper)

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#customer-form"
  })
})
```

The above code works as if you wrote as follows:

```javascript
import Vue from 'vue/dist/vue.esm'

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#customer-form",
    data: {
      customer: {
        name: "john",
        plan: "A",
        approved: true,
        gender: "",
        remarks: "Good"
      }
    }
  })
})
```

Note that the `<form>` element must be an actual HTML element, not a Vue template.
You cannot use this plugin for the string specified as the `template` option
of a Vue component. See "How this plugin works" section below.

## Installation

```bash
npm install vue-data-scooper
```

## How this plugin works

This plugin collects data using browser's DOM manipulation methods, such as
[DocumentFragment.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/querySelectorAll) and [Element.getAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute).

## See Also

* [vue-rails-form-builder](https://github.com/kuroda/vue-rails-form-builder)

## License

vue-data-scooper is released under [the MIT License](LICENSE).

## Author

[Tsutomu Kuroda](https://github.com/kuroda)

# vue-data-scooper - A Vue.js plugin

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
        remarks: "Good"
      }
    }
  })
})
```

Note that the `<form>` element must be an actual HTML element, not a template.
This plugin collects data using browser's DOM manipulation methods, such as
[DocumentFragment.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/querySelectorAll) and [Element.getAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute).

## Installation

```bash
npm install vue-data-scooper
```

## See Also

* [vue-form-for](https://github.com/kuroda/vue-form-for)

## License

vue-data-scooper is released under [the MIT License](LICENSE).

## Author

[Tsutomu Kuroda](https://github.com/kuroda)

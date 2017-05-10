# vue-data-scooper - A Vue.js plugin

## Synopsis

As the official Vue.js document says:

> `v-model` will ignore the initial `value`, `checked` or `selected` attributes
> found on any form elements.

With this plugin, you can initialize the Vue instance data from form elements.

## Usage

```bash
npm install vue-data-scooper
```

```html
<form id="customer-form">
  <input type="text" v-model="customer.name" name="customer[name]" value="john">
  <input type="radio" v-model="customer.plan" name="customer[plan]" value="A" checked>
  <input type="radio" v-model="customer.plan" name="customer[plan]" value="B">
  <textarea v-model="customer.remarks" name="customer[remarks]">Good</textarea>
</form>
```

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

## License

vue-data-scooper is released under [the MIT License](LICENSE).

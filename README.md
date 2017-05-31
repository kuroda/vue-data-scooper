# vue-data-scooper - A Vue.js plugin for data initialization

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

## Background on which this plugin was created

The Vue.js version 1 allows us to provide initial values to the `v-model`
via `value` attribute, but this functionality was
[deprecated](https://vuejs.org/v2/guide/migration.html#value-Attribute-with-v-model-removed)
on the version 2.0.

Migration guide says:

> `v-model` no longer cares about the initial value of an inline `value` attribute.
> For predictability, it will instead always treat the Vue instance data as the source of truth.

And, Evan You (the creator of Vue.js) explains about this deprecation:

> In Vue 2.0, the template is like a function: it gets called every time something changes.
> With this in mind, having an inline value is basically saying the input's value is static
> and should never change - which doesn't make sense when you are using v-model with it.
> (https://github.com/vuejs/vue/issues/3924#issuecomment-253351024)

Although, as he suggests, we can embed the form values in the HTML document,
that solution is rather cumbersome for Rails app developers.
For this reason, I created this plugin.

## How this plugin works

This plugin provides a function to be set to the `data` option of Vue components.

Firstly, this function gets the list of DOM elements with `v-model` attribute
within the root element of Vue component:

```
const root = document.querySelector(this.$options.el)
const inputs = root.querySelectorAll("[v-model]")
```

Then, iterating through this list, it creates an object (a nested hash).
The following abbreviated code illustrates the basic mechanism:

```
const obj = {}
for (let i = 0; i < inputs.length; i++) {
  let path = el.getAttribute("v-model")

  set(obj, path, el.value)
}
```

The function `set` is imported from the [lodash](https://lodash.com).
With this function, we can convert `<input type="text" v-model="user.name" value="alice">`
to `{ user: { name: "alice" } }`.

Note that this plugin collects data using browser's DOM manipulation methods, such as
[DocumentFragment.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/querySelectorAll) and [Element.getAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute).
For that reason, the `<form>` element must be an actual HTML element, not a Vue template.

## `getInitialData` function

This package exports the `getInitialData` function to extract initial data
from the DOM tree.

Here is an example of its usage:

```javascript
import { getInitialData } from "vue-data-scooper"

let template = `
  <form>
    <input type='text' v-model='user.name' value='Alice'>
    <input type='checkbox' v-model='user.approved' checked>
  </form>
`

let parser = new DOMParser(template)
let doc = parser.parseFromString(template, "text/html")
getInitialData(doc) // => { user: { name: 'Alice', approved: true } }
```

## Development Setup

```bash
# install dependencies
yarn install

# test
yarn test
```

You need the Google Chrome version 59 or higher to run test.
If you use `google-chrome-beta`, export `CHROME_BIN` environment variable:

```bash
export CHROME_BIN=$(which google-chrome-beta)
```

## See Also

* [vue-remote-template](https://github.com/kuroda/vue-remote-template)
* [vue-rails-form-builder](https://github.com/kuroda/vue-rails-form-builder)

## License

vue-data-scooper is released under [the MIT License](LICENSE).

## Author

[Tsutomu Kuroda](https://github.com/kuroda)

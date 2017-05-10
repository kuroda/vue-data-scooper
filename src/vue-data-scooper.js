import get from "lodash.get"
import has from "lodash.has"
import set from "lodash.set"

const VueDataScooper = {
  install: function(Vue, options) {
    Vue.mixin({
      data: function() {
        const obj = {}

        const inputs = document.querySelector(this.$options.el)
          .querySelectorAll("[v-model]")

        for (let i = 0; i < inputs.length; i++) {
          let el = inputs[i]
          let type = el.getAttribute("type")
          let path = el.getAttribute("v-model")

          if (el.tagName === "INPUT" && type === "radio") {
            if (el.checked) {
              set(obj, path, el.value)
            }
            else if (!has(obj, path)) {
              set(obj, path, undefined)
            }
          }
          else if (el.tagName === "INPUT" && type === "checkbox") {
            if (el.checked) {
              let value = get(obj, path)
              if (value === undefined) {
                set(obj, path, el.value)
              }
              else if (Array.isArray(value)) {
                value.push(el.value)
                set(obj, path, el.value)
              }
              else {
                set(obj, path, [ el.value ])
              }
            }
            else if (!has(obj, path)) {
              set(obj, path, undefined)
            }
          }
          else if (el.tagName === "SELECT" && el.multiple) {
            // Not yet implemented.
          }
          else {
            set(obj, path, el.value)
          }
        }

        return obj
      }
    })
  }
}

export default VueDataScooper

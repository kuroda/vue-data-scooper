import get from "lodash.get"
import has from "lodash.has"
import set from "lodash.set"

const VueDataScooper = {
  install: function(Vue, options) {
    Vue.mixin({
      data: function() {
        const obj = {}
        const root = document.querySelector(this.$options.el)
        const inputs = root.querySelectorAll("[v-model]")

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
            let checkboxesWithSameName = root.querySelectorAll(
              `input[type='checkbox'][v-model='${path}']`)
            if (checkboxesWithSameName.length > 1) {
              if (!has(obj, path)) set(obj, path, [])

              if (el.checked) {
                let values = get(obj, path)
                values.push(el.value)
                set(obj, path, values)
              }
            }
            else {
              set(obj, path, el.checked)
            }
          }
          else if (el.tagName === "SELECT" && el.multiple) {
            let values = []
            for (let j = 0; j < el.selectedOptions.length; j++) {
              values.push(el.selectedOptions[j].value)
            }
            set(obj, path, values)
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

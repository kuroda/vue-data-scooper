import get from "lodash.get"
import has from "lodash.has"
import set from "lodash.set"

function scoop(doc, el, obj) {
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
    let checkboxesWithSameName = doc.querySelectorAll(
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

export const getInitialData = function(doc) {
  const obj = {}
  const inputs = doc.querySelectorAll("[v-model]")

  if (doc.dataset) {
    for (let key in doc.dataset) {
      obj[key] = JSON.parse(doc.dataset[key])
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    scoop(doc, inputs[i], obj)
  }

  return obj
}

const VueDataScooper = {
  install: function(Vue, options) {
    Vue.mixin({
      data: function() {
        element = this.$options.el
        const root = element instanceof Element ? element : document.querySelector(element)
        return getInitialData(root)
      }
    })
  }
}

export default VueDataScooper

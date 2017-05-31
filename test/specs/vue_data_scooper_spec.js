import Vue from 'vue/dist/vue.esm'
import VueDataScooper from '../../src/vue-data-scooper'
import { expect } from 'chai'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(VueDataScooper)

describe('VueDataScooper', () => {
  let vm

  beforeEach(() => {
    const container = document.createElement('div')
    container.setAttribute('id', 'app')
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (vm) vm.$destroy(true)
    document.getElementById("app").outerHTML = ""
  })

  it('should initialize the Vue component data', (done) => {
    const element = document.getElementById("app")

    element.innerHTML = `
      <form id="customer-form">
        <input type="text" v-model="customer.name" name="customer[name]"
          value="john">
        <input type="radio" v-model="customer.plan" name="customer[plan]"
          value="A" checked>
        <input type="radio" v-model="customer.plan" name="customer[plan]"
          value="B">
        <input type="hidden" name="customer[approved]" value="0">
        <input type="checkbox" v-model="customer.approved"
          name="customer[approved]" value="1" checked>
        <select v-model="customer.gender" name="customer[gender]">
          <option value="" selected>Unspecified</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <textarea v-model="customer.remarks"
          name="customer[remarks]">Good</textarea>
      </form>
    `

    vm = new Vue({
      el: "#app"
    })

    setTimeout(() => {
      expect(vm.$data.customer).to.deep.equal({
        name: "john",
        plan: "A",
        approved: true,
        gender: "",
        remarks: "Good"
      })
      done();
    }, 1);
  })
})

import { getInitialData } from "../../src/vue-data-scooper"
import { expect } from "chai"

describe("getInitialData", () => {
  beforeEach(() => {
    const container = document.createElement("div")
    container.setAttribute("id", "form")
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.getElementById("form").outerHTML = ""
  })

  it("should return an empty object", (done) => {
    const element = document.getElementById("form")
    const data = getInitialData(element)

    expect(data).to.eql({})
    done()
  })

  it("should return { username: 'Alice' }", (done) => {
    const element = document.getElementById("form")

    element.innerHTML = `
      <input type="text" name="username" v-model="username" value="Alice">
    `

    const data = getInitialData(element)

    expect(data).to.deep.equal({ username: "Alice" })
    done()
  })

  it("should return { user: { name: 'Alice' } }", (done) => {
    const element = document.getElementById("form")

    element.innerHTML = `
      <input type="text" name="user[name]" v-model="user.name" value="Alice">
    `

    const data = getInitialData(element)

    expect(data).to.deep.equal({ user: { name: "Alice" } })
    done()
  })

  it("should return { gender: 'female' }", (done) => {
    const element = document.getElementById("form")

    element.innerHTML = `
      <input type="radio" name="gender" v-model="gender" value="">
      <input type="radio" name="gender" v-model="gender" value="female" checked>
      <input type="radio" name="gender" v-model="gender" value="male">
    `

    const data = getInitialData(element)

    expect(data).to.deep.equal({ gender: "female" })
    done()
  })

  it("should return { confirmed: true }", (done) => {
    const element = document.getElementById("form")

    element.innerHTML = `
      <input type="hidden" name="confirmed" value="0">
      <input type="checkbox" name="confirmed" v-model="confirmed" value="1" checked>
    `

    const data = getInitialData(element)

    expect(data).to.deep.equal({ confirmed: true })
    done()
  })

  it("should return { color: [ 'red', 'green' ] }", (done) => {
    const element = document.getElementById("form")

    element.innerHTML = `
      <input type="checkbox" name="color" v-model="color" value="red" checked>
      <input type="checkbox" name="color" v-model="color" value="blue">
      <input type="checkbox" name="color" v-model="color" value="green" checked>
    `

    const data = getInitialData(element)

    expect(data).to.deep.equal({ color: [ "red", "green" ] })
    done()
  })

  it("should return { language: 'JavaScript' }", (done) => {
    const element = document.getElementById("form")

    element.innerHTML = `
      <select name="language" v-model="language">
        <option value="JavaScript" selected>JavaScript</option>
        <option value="Ruby">Ruby</option>
        <option value="Elixir">Elixir</option>
      </select>
    `

    const data = getInitialData(element)

    expect(data).to.deep.equal({ language: "JavaScript" })
    done()
  })

  it("should return { language: [ 'Ruby', 'Elixir' ] }", (done) => {
    const element = document.getElementById("form")

    element.innerHTML = `
      <select name="language" v-model="language" multiple>
        <option value="JavaScript">JavaScript</option>
        <option value="Ruby" selected>Ruby</option>
        <option value="Elixir" selected>Elixir</option>
      </select>
    `

    const data = getInitialData(element)

    expect(data).to.deep.equal({ language: [ "Ruby", "Elixir" ] })
    done()
  })
})

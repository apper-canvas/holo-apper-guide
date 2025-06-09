import examplesData from '../mockData/examples.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let examples = [...examplesData]

export const exampleService = {
  async getAll() {
    await delay(300)
    return [...examples]
  },

  async getById(id) {
    await delay(200)
    const example = examples.find(e => e.id === id)
    if (!example) {
      throw new Error('Example not found')
    }
    return { ...example }
  },

  async create(exampleData) {
    await delay(400)
    const newExample = {
      ...exampleData,
      id: `example-${Date.now()}`
    }
    examples.push(newExample)
    return { ...newExample }
  },

  async update(id, data) {
    await delay(300)
    const index = examples.findIndex(e => e.id === id)
    if (index === -1) {
      throw new Error('Example not found')
    }
    examples[index] = { ...examples[index], ...data }
    return { ...examples[index] }
  },

  async delete(id) {
    await delay(300)
    const index = examples.findIndex(e => e.id === id)
    if (index === -1) {
      throw new Error('Example not found')
    }
    const deletedExample = examples[index]
    examples.splice(index, 1)
    return { ...deletedExample }
  }
}
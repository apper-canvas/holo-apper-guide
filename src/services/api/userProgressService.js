import userProgressData from '../mockData/userProgress.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let userProgress = [...userProgressData]

export const userProgressService = {
  async getAll() {
    await delay(300)
    return [...userProgress]
  },

  async getById(id) {
    await delay(200)
    const progress = userProgress.find(p => p.id === id)
    if (!progress) {
      throw new Error('User progress not found')
    }
    return { ...progress }
  },

  async create(progressData) {
    await delay(400)
    const newProgress = {
      ...progressData,
      id: progressData.id || `user-${Date.now()}`,
      lastAccessed: new Date()
    }
    userProgress.push(newProgress)
    return { ...newProgress }
  },

  async update(id, data) {
    await delay(300)
    const index = userProgress.findIndex(p => p.id === id)
    if (index === -1) {
      // Create new progress if not found
      const newProgress = {
        ...data,
        id: id,
        lastAccessed: new Date()
      }
      userProgress.push(newProgress)
      return { ...newProgress }
    }
    userProgress[index] = { ...userProgress[index], ...data, lastAccessed: new Date() }
    return { ...userProgress[index] }
  },

  async delete(id) {
    await delay(300)
    const index = userProgress.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('User progress not found')
    }
    const deletedProgress = userProgress[index]
    userProgress.splice(index, 1)
    return { ...deletedProgress }
  }
}
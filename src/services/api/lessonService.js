import lessonsData from '../mockData/lessons.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let lessons = [...lessonsData]

export const lessonService = {
  async getAll() {
    await delay(300)
    return [...lessons]
  },

  async getById(id) {
    await delay(200)
    const lesson = lessons.find(l => l.id === id)
    if (!lesson) {
      throw new Error('Lesson not found')
    }
    return { ...lesson }
  },

  async create(lessonData) {
    await delay(400)
    const newLesson = {
      ...lessonData,
      id: `lesson-${Date.now()}`,
      completed: false,
      progress: 0
    }
    lessons.push(newLesson)
    return { ...newLesson }
  },

  async update(id, data) {
    await delay(300)
    const index = lessons.findIndex(l => l.id === id)
    if (index === -1) {
      throw new Error('Lesson not found')
    }
    lessons[index] = { ...lessons[index], ...data }
    return { ...lessons[index] }
  },

  async delete(id) {
    await delay(300)
    const index = lessons.findIndex(l => l.id === id)
    if (index === -1) {
      throw new Error('Lesson not found')
    }
    const deletedLesson = lessons[index]
    lessons.splice(index, 1)
    return { ...deletedLesson }
  }
}
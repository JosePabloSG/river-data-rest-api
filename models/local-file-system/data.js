import { readJSON } from '../../utils.js'
const data = readJSON('./data.json')

export class DataModel {
  static filterData (data, filter) {
    return data.filter((item) => {
      for (const key in filter) {
        if (item[key] !== filter[key]) {
          return false
        }
      }
      return true
    })
  }

  static getAll () {
    const filter = {
      waterLevel: undefined,
      date: undefined,
      time: undefined,
      location: undefined
    }

    const filteredData = DataModel.filterData(data, filter)

    return filteredData
  }

  static returnFilteredData (req, res) {
    const { waterLevel, date, time, location } = req.query

    const filter = {}

    if (waterLevel !== undefined) {
      filter.waterLevel = parseInt(waterLevel)
    }
    if (date !== undefined) {
      filter.date = date
    }
    if (time !== undefined) {
      filter.time = time
    }
    if (location !== undefined) {
      filter.location = location
    }

    const filteredData = DataModel.filterData(data, filter)

    res.json(filteredData)
  }

  static async getById (id) {
    const foundData = data.find((item) => item.id === id)
    return foundData
  }

  static async delete ({ id }) {
    const foundDataIndex = data.findIndex((item) => item.id === id)
    if (foundDataIndex === -1) return false

    data.splice(foundDataIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const foundDataIndex = data.findIndex((item) => item.id === id)
    if (foundDataIndex === -1) return false

    data[foundDataIndex] = {
      ...data[foundDataIndex],
      ...input
    }

    return data[foundDataIndex]
  }
}

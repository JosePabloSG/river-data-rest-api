import { validatePartialData } from '../schemas/data.js'

export class DataController {
  constructor ({ dataModel }) {
    this.dataModel = dataModel
  }

  getAll = async (req, res) => {
    const { waterLevel, date, time, location } = req.query
    const where = {}
    if (waterLevel) {
      where.waterLevel = waterLevel
    }
    if (date) {
      where.date = date
    }
    if (time) {
      where.time = time
    }
    if (location) {
      where.location = location
    }
    const data = await this.dataModel.getAll(where)
    res.json(data)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const data = await this.dataModel.getById({ id })
    if (data) return res.json(data)
    res.status(404).json({ message: 'Water level data not found' })
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.dataModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Water level data not found' })
    }

    return res.json({ message: 'Water level data deleted' })
  }
//test
  update = async (req, res) => {
    const result = validatePartialData(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedWaterLevelData = await this.dataModel.update({ id, input: result.data })

    return res.json(updatedWaterLevelData)
  }
}

import { Router } from 'express'
import { DataController } from '../controllers/dataController.js'

export const createDataRouter = ({ dataModel }) => {
  const dataRouter = Router()

  const dataControllerInstance = new DataController({ dataModel })

  dataRouter.get('/', dataControllerInstance.getAll)
  dataRouter.get('/:id', dataControllerInstance.getById)
  dataRouter.patch('/:id', dataControllerInstance.update)
  dataRouter.delete('/:id', dataControllerInstance.delete)

  return dataRouter
}

import {Router} from "express"
import { categoryIdValidator, categoryNameValidator, categoryValidator, updateCategoryValidator } from "../../middlewares/validators.js"
import { categoryDelete, getAll, getCategory, getCategoryByName, saveCategory, updateCategory } from "./category.controller.js"

const api = Router()

api.post(
    '/addCategory',categoryValidator, saveCategory
)

api.get(
    '/listCategoryById/:id', categoryIdValidator, getCategory
)

api.get(
    '/listCategory', getAll
)

api.get(
    '/listCategoryByName/:name', categoryNameValidator , getCategoryByName
)

api.put(
    '/updateCategory/:id',categoryIdValidator, updateCategoryValidator , updateCategory
)

api.delete(
    '/deleteCategory/:id', categoryIdValidator, categoryDelete
)
export default api
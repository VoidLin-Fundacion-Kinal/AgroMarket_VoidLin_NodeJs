// middlewares/multer.js
import multer from 'multer' 
import path from 'path' 
import { fileURLToPath } from 'url' 
import fs from 'fs' 

const __filename = fileURLToPath(import.meta.url) 
const __dirname = path.dirname(__filename) 

/*----------------- Crear carpetas necesarias si no existen -------------------*/
const defaultDir = path.join(__dirname, '../images/imagesGeneral') 
const profileDir = path.join(__dirname, '../images/profileImages') 
const postDir = path.join(__dirname, '../images/postImages') 
const providerDir = path.join(__dirname, '../images/providerImages') 
const productsDir = path.join(__dirname, '../images/productsImages');

[defaultDir, profileDir, postDir, providerDir, productsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }) 
}) 

/* ------------ Configuración de almacenamiento con rutas y nombre ----------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'images') return cb(null, postDir) 
    if (file.fieldname === 'logo' || file.fieldname === 'photo') return cb(null, profileDir) 
    if (file.fieldname === 'providerLogo') return cb(null, providerDir) 
    if (file.fieldname === 'categoryPhoto') return cb(null, productsDir) 
    if (file.fieldname === 'productImage') return cb(null, productsDir) 
    return cb(null, defaultDir)  // Fallback
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname) 

    // Si no tiene extensión, usar el tipo MIME
    if (!ext) {
      const mimeToExt = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/jpg': '.jpg',
      } 
      ext = mimeToExt[file.mimetype] || '' 
    }

    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}` 
    cb(null, uniqueName) 
  }
}) 

/* -------------------- Filtro de tipo de archivo permitido -------------------- */
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg'] 
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error('Only JPG, JPEG and PNG images are allowed'), false) 
} 

const baseConfig = {
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
} 

/* -------------------- EXPORTS: diferentes tipos de carga -------------------- */

// 1. Para endpoints que suben 1 imagen de perfil (logo o photo)
export const uploadProfilePicture = multer(baseConfig).single('logo')  // o 'photo'

// 2. Para publicaciones (posts) que permiten 0..10 imágenes
export const uploadPostImages = multer(baseConfig).array('images', 10) 

// 3. Para proveedor (providerLogo)
export const uploadProviderImages = multer(baseConfig).single('providerLogo') 

// 4. Para categorías de producto (2 imágenes como máximo)
export const uploadProductImages = multer(baseConfig).array('categoryPhoto', 2) 

// 5. ✅ Para un producto con una sola imagen
export const uploadSingleProductImage = multer(baseConfig).single('productImage') 

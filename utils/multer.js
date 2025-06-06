import multer from "multer";
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '../images/profileImages'))
        },

        filename: function(req, file, cb){
            const ext = path.extname(file.originalname)
            cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
        }
    }
)

const fileFilter =(req, file, cb) => {
    const allowerTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if(allowerTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error('Only JPG, JPEG and PNG images are allowed.'), false)
    }
}

const upload = multer(
    {
        storage,
        fileFilter,
        limits: {
            fileSize: 5*1024*1024
        }
    }
)

export default upload

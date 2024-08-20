import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

//S3 설정
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
    region: process.env.AWS_REGION,
});


//multer 설정
const storage = multer.memoryStorage();
const upload = multer({storage});

const imageController = express.Router();

imageController.post('/', upload.single('image'), async(req, res, next) => {
    try{
        const file = req.file;
        if(!file){
            return res.status(400).json({ message : '이미지가 필요합니다.' });
        }
        console.log(process.env.S3_BUCKET_NAME);
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        //upload to S3
        const data = await s3.upload(params).promise();

        //return image url
        return res.status(200).json({ imageUrl : data.Location });
    } catch(error){
        console.log(error);
        next(error);
    }
})

export default imageController;
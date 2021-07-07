import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"

const { AWS_ID, AWS_KEY } = process.env;

const region = "us-east-2"
const bucketName = "eco-media-bucket"
const accessKeyId = AWS_ID
const secretAccessKey = AWS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
}) 

const randomBytes = promisify(crypto.randomBytes)

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return JSON.stringify(uploadURL)
}
import { imagePlugin, ImageUploadType } from '@react-page/plugins-image';

const fakeImageUploadService: (url: string) => ImageUploadType = (
    defaultUrl
  ) => (file, reportProgress) => {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        reportProgress(counter * 10);
        if (counter > 9) {
          clearInterval(interval);
          console.log(
            'This is a fake image upload service, please provide actual implementation via plugin properties'
          );
          resolve({ url: defaultUrl });
        }
      }, 500);
    });
  };

export default imagePlugin({ imageUpload: fakeImageUploadService('/images/react.png') });
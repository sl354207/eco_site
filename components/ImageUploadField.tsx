import React from 'react';
import { HTMLFieldProps, connectField } from 'uniforms';

import BackupIcon from '@material-ui/icons/Backup';

type ImageProps = HTMLFieldProps<string, HTMLDivElement>;

function Image({ onChange, value }: ImageProps) {
  return (
    <div className="ImageField">
      <label htmlFor="file-input">
        <div>Choose your photo</div>
        <img
          alt=""
          style={{ cursor: 'pointer', width: '150px', height: '150px' }}
          src={value}
        />
        <BackupIcon />
      </label>
      <input
        accept="image/*"
        id="file-input"
        onChange={({ target: { files } }) => {
          if (files && files[0]) {
            onChange(URL.createObjectURL(files[0]));
            console.log(files[0].name);
          }
        }}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  );
}

export default connectField(Image);
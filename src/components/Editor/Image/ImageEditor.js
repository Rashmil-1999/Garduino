import React, {
 useState, useCallback, useImperativeHandle, forwardRef 
} from 'react';
import PropTypes from 'prop-types';

import {
  Label,
  Input,
  Button,
  Form,
  FormGroup,
} from 'reactstrap';
import { useInput } from 'react-hanger';
import Dropzone from 'react-dropzone';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    resolve(event.target.result);
  };
  reader.onerror = (error) => {
    reject(error);
  };

  reader.readAsDataURL(file);
});

const ImageEditor = forwardRef((props, ref) => {
  const [uploadedImage, setImage] = useState(props.value);
  const urlInput = useInput();

  // -----

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const base64EncodedImage = await toBase64(file);
    setImage(base64EncodedImage);
  }, []);

  const onUrlFormSubmit = useCallback((e) => {
    e.preventDefault();
    setImage(urlInput.value);
  }, [urlInput.value]);

  useImperativeHandle(ref, () => ({
    // For sending the image up using Ref
    getSrc() {
      return uploadedImage;
    },
  }));

  // -----

  return (
    <div className="d-flex flex-column align-items-center">
      {uploadedImage && <img className="p-1 img-fluid" alt="Uploaded" src={uploadedImage}></img>}

      <Dropzone
        onDrop={onDrop}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className="mt-1 w-75 border border-primary"
            style={{
              height: '8rem',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>Drag {"'n"} drop an image here, or click to select images</p>
          </div>
        )}
      </Dropzone>

      <Form className="mt-1 p-2" onSubmit={onUrlFormSubmit}>
        <FormGroup row>
          <Label>Or enter a url to fetch the image: </Label>
          <Input value={urlInput.value} onChange={urlInput.onChange} />
          <Button type="submit" color="primary" className="mt-1">Get Image</Button>
        </FormGroup>
      </Form>

    </div>
  );
});

ImageEditor.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ImageEditor;

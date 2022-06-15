import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Randomstring from 'randomstring';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const getUrlExtension = (url) => {
  return url
    .split(/[#?]/)[0]
    .split(".")
    .pop()
    .trim();
}

const UploadImages = ({orderId, disableEditing}) => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [state, setState] = useState({
    showModal: false,
    currentImage: null
  });

  useEffect(async () => {
    try {
      const result = await axios.get(`/orders/images/${orderId}`,);
      const generateObjectFileFromSrc = await Promise.all(result.data.map(async (image) => {
        const fetchedImage = await fetch('/storage/'+image.path);
        const blobImage = await fetchedImage.blob();

        return new File(
          [blobImage], 
          `${Randomstring.generate()}.${getUrlExtension(image.path)}`,
          {
            type: blobImage.type
          }
        );
      }));
      setImages(generateObjectFileFromSrc);
    } catch (e) {
    }
  }, []);

  const uploadImages = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.delete('images[]');

      images.forEach(img => {
        formData.append('images[]', img);
      })


      const response = await axios.post(`/orders/images/${orderId}`, formData); 

      if (response.status === 200) {
        toast('Images successfully updated', {
          type: 'success'
        });
      }

      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);

      toast('Something went wrong 😢', {
        type: 'error'
      });
    }
  }

  const removeImage = index => {
    setImages(images.filter((_, idx) => idx != index));
  }

  return (
    <>
      <div class="form-group">
          <label>Result photos:</label>

          <div className='row'>
            {images.map((image, idx) => (
              <div className='col-md-4' style={{marginBottom: 10}}>
                <div style={{position: 'relative'}}>
                  {!disableEditing && (
                    <span style={{position: 'absolute', right: '10px', top: '10px', color: '#ed0598', fontSize: '18px'}}>
                      <i class="fa fa-times" aria-hidden="true" onClick={() => removeImage(idx)}></i>
                    </span>
                  )}
                  <img
                    key={idx}
                    style={{width: '100%', height: '250px', objectFit: 'cover'}}
                    src={URL.createObjectURL(image)}
                    onClick={() => setState({currentImage: image, showModal: true})}
                  />
                </div>
              </div>
            ))}
          </div>

          {state.showModal && (
            <Lightbox
              mainSrc={URL.createObjectURL(state.currentImage)}
              onCloseRequest={() => setState({showModal: false, currentImage: null})}
            />
          )}
 
          {!disableEditing && (
            <div className="inputfile" style={{marginTop: '20px'}}>
                <input
                    type="file"
                    size="30"
                    name="file"
                    multiple
                    id="file"
                    style={{display: 'none'}}
                    onChange={e => {
                      setImages([...images, ...e.target.files])
                    }}
                />
                <button 
                  disabled={isUploading} 
                  onClick={(e) => uploadImages(e)} 
                  className='btn btn-primary custom-installer-upload'
                >Save and upload</button> <label style={{ marginRight: '15px' }} htmlFor="file"><span className='btn btn-primary custom-installer-btn'>Add new images</span></label>
            </div>
          )}
      </div>

      <ToastContainer />
    </>
  )
}

export default UploadImages;
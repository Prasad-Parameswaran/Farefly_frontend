
//const validateImage = (file, field) => {
//    if (!file) {
//        setUploadError((prev) => ({ ...prev, [field]: 'Please select an image.' }));
//        return false;
//    }
//    setUploadError((prev) => ({ ...prev, [field]: '' }));
//    return true;
//};

//const image1 = async (e) => {
//    const file = e.target.files[0];
//    const isValid = validateImage(file, 'image1');
//    if (!isValid) return;

//    const formData = new FormData();
//    formData.append('file', file);
//    formData.append('upload_preset', upload_preset);
//    try {
//        const response = await axios.post(https://api.cloudinary.com/v1_1/${cloud_name}/image/upload, formData);
//      if (response?.data?.secure_url) {
//            setImageOne(response.data.secure_url);
//        }
//    } catch (error) {
//        console.error('Error uploading image1:', error);
//    }
//};

/////////////////////////da methelepole bakki images ne kofukkuka

//const handleSubmit = async (e) => {
//    e.preventDefault();

//    // Check if all images are selected before submitting the form
//    const areImagesValid =
//        validateImage(imageOne, 'image1') &&
//        validateImage(imageTwo, 'image2') &&
//        validateImage(imageThree, 'image3') &&
//        validateImage(imageFour, 'image4') &&
//        validateImage(rcimage, 'RCimage');

//    if (!areImagesValid) {
//        ///////////////////////da oru image eroroe adichal dipslay akkan ede atuthulka
//        return;
//    }

//    const formData = new FormData(e.target);
//    formData.append('image1', imageOne);
//   bakki append akke
//};

import axios from 'axios';


const fetchImages = async url => {
  const response = await axios.get(url);
  // console.log(response.data);
  return response.data;
};


export default fetchImages;

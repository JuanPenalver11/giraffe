import { useState } from "react";
import { useSnackbar } from "notistack";

const usePrevImgHook = () => {
	
  const [imgUrl, setImgUrl] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleImgChange = (e) => {

    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setImgUrl(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
			enqueueSnackbar("Invalid file type, please select an image file", {variant:'error'});
			setImgUrl(null);
		}
  };

  return { handleImgChange, imgUrl };
};

export default usePrevImgHook;

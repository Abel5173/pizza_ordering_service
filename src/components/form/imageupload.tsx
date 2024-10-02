import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button, Box, Typography } from "@mui/material";
import Image from "next/image";

interface ImageUploadProps {
  preview: string | null;
  required?: boolean;
  triggerFileInput: () => void;
  removeImage: () => void;
  register: any;
  hiddenFileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { logo?: { message: string } };
}

const ImageUpload: React.FC<ImageUploadProps> = ({ preview, triggerFileInput, removeImage, register, hiddenFileInputRef, handleFileChange, errors, required }) => {
  return (
    <Box className="upload" sx={{ textAlign: 'center', paddingTop: '1rem'}}>
      {!preview && (
        <Button
          variant="outlined"
          onClick={triggerFileInput}
          sx={{ 
            marginBottom: '1rem',
            borderColor: '#FF8100',
            width: '100%',
            color: '#FF8100',
            '&:hover': {
                backgroundColor: '#FF8100',
                color: 'white',
            }}
        }
        >
            <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
            Upload Restaurant Logo
        </Button>
      )}

      {preview && (
        <Box className="preview" sx={{ textAlign: 'center' }}>
          <Image
            src={preview}
            className="img"
            alt="profilePicture"
            height={50}
            width={50}
          />
          <Box className="buttons" sx={{ marginTop: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={triggerFileInput}
              sx={{ 
                backgroundColor: '#FF8100', 
                marginRight: '0.5rem',
                '&:hover': {
                    backgroundColor: '#FF9900',
                },
            }}
            >
              Change Image
            </Button>

            <Button
                variant="outlined"
                onClick={removeImage}
                sx={{
                    borderColor: '#C70000',  // Outline color
                    color: '#C70000',        // Text color
                    '&:hover': {
                    borderColor: '#ff2f33', // Outline color on hover
                    color: 'white',         // Text color on hover
                    backgroundColor: '#ff2f33', // Background color on hover
                    },
                }}
                >
                Remove Image
            </Button>

          </Box>
        </Box>
      )}

      <input
        {...register("logo")}
        ref={hiddenFileInputRef}
        hidden
        required={required}
        type="file"
        onChange={handleFileChange}
      />
      
      {errors.logo && (
        <Typography className="error" sx={{ color: 'red', marginTop: '0.5rem' }}>
          {errors.logo.message}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;

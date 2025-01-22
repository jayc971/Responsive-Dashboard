import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { staticImage } from './data/data';

const StaticImage = ({ onEdit }) => {
  const [image, setImage] = useState(() => {
    // Load image from localStorage or use the default placeholder
    return localStorage.getItem('imageURL') || staticImage;
  });

  useEffect(() => {
    // Save image to localStorage whenever it changes
    localStorage.setItem('imageURL', image);
  }, [image]);

  const handleImageChange = () => {
    const newImage = prompt('Enter the URL of the new image:', image);
    if (newImage) {
      setImage(newImage);
    }
  };

  return (
    <Box
      className="image-placeholder-widget"
      sx={{
        width: '100%',
        height: 'auto',
        margin: '0 auto',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        p: 2,
      }}
    >
      {onEdit && (
        <Button variant="contained" color="primary" onClick={handleImageChange}>
          Change Image
        </Button>
      )}
      <Box
        component="img"
        src={image}
        alt="Placeholder"
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: '4px',
          marginTop: '8px',
        }}
      />
    </Box>
  );
};

export default StaticImage;

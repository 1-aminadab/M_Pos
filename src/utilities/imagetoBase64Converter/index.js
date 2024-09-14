import React, { useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';

const convertImageToBase64 = async (imagePath) => {
    try {
      const response = await RNFetchBlob.fs.readFile(imagePath, 'base64');
      const base64Data = `data:image/png;base64,${response}`; // Adjust content type based on image format (e.g., jpeg, svg)
      return base64Data;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null; // Handle error appropriately or return an error object
    }
  };
import React, { useState,useEffect } from 'react'
import { TextInput,Stack,Button } from '@mantine/core';
import Service from '../../utils/http';


const URLshortner = () => {
    const service = new Service();
    const [data, setData] = useState({});
    const [shortUrl, setShortUrl] = useState(null);
  const handleManualSubmit = () => {
    const originalInput = document.querySelector('input[placeholder="https://example.com"]');
    const aliasInput = document.querySelector('input[placeholder="your-custom-alias"]');
    const titleInput = document.querySelector('input[placeholder="Your Title"]');

    const originalUrl = originalInput ? originalInput.value.trim() : '';
    const customAlias = aliasInput ? aliasInput.value.trim() : '';
    const title = titleInput ? titleInput.value.trim() : '';

    if (!originalUrl) {
      alert('Please fill all fields');
      return;
    }

    console.log({ originalUrl, customAlias, title });
  };
    const handleSubmit = async (e) => {
      if (e) {
        e.preventDefault();
      }
      try {
        console.log(data);
        const response = await service.post('s', data);
        setShortUrl(response.shortCode);
      }
      catch (error) {
        console.log("Post API call failed", error.message);
      }
    }
    useEffect(() => {
      if (shortUrl) {
        console.log(`Short URL is ${shortUrl}`);
      }
     }, [shortUrl])

    
  return (
      <>
      {shortUrl && shortUrl.length > 0  ? <p>Short URL: {shortUrl}</p> : 
    <form onSubmit={handleSubmit}>
    <Stack>
       <TextInput
      label="Original URL"
      withAsterisk
      description="Enter the URL you want to shorten"
      placeholder="https://example.com"
      onChange={(e) => setData({ ...data, originalUrl: e.target.value })}
    />

     <TextInput
      label="Customize the Link"
      description="Enter a custom alias for your shortened URL "
      placeholder="your-custom-alias"
      onChange={(e) => setData({ ...data, customAlias: e.target.value })}
    /> 
    <TextInput
      label="Title"
      description="Enter a title for your shortened URL"
      placeholder="Your Title"
      onChange={(e) => setData({ ...data, title: e.target.value })} 
      />
    <Button type="submit" onClick={handleManualSubmit}>Shorten URL</Button>
    </Stack>
    </form>
  }
  </>
  )
}

export default URLshortner
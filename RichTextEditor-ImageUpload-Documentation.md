# Rich Text Editor Image Upload Documentation

## Overview

The Rich Text Editor now supports both URL-based image insertion and local file uploads. When a user chooses to upload a local file, the editor dispatches an `imageUpload` event that you can handle to upload the file to your backend.

## How to Handle Image Upload

### 1. Listen for the `imageUpload` Event

In your parent component, listen for the `imageUpload` event:

```svelte
<script>
  import RichTextEditor from '$lib/components/editor/rich-text-editor.svelte';
  
  async function handleImageUpload(event) {
    const { file, alt, callback } = event.detail;
    
    try {
      // Upload the file to your backend
      const uploadedUrl = await uploadImageToBackend(file);
      
      // Call the callback with the uploaded URL
      callback(uploadedUrl);
    } catch (error) {
      console.error('Failed to upload image:', error);
      // Call callback with null/empty string to indicate failure
      callback('');
    }
  }
  
  async function uploadImageToBackend(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const result = await response.json();
    return result.url; // Return the uploaded image URL
  }
</script>

<RichTextEditor 
  bind:content={content}
  on:imageUpload={handleImageUpload}
/>
```

### 2. Backend Endpoint Example

Create an endpoint that accepts file uploads and returns the file URL:

```javascript
// Example with Express.js and multer
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    
    // Save file to your storage (AWS S3, local storage, etc.)
    const fileUrl = await saveFileToStorage(file);
    
    res.json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});
```

### 3. Event Detail Structure

The `imageUpload` event contains:

- `file`: The selected File object
- `alt`: The alt text entered by the user
- `callback`: A function to call with the uploaded URL

```typescript
interface ImageUploadEventDetail {
  file: File;
  alt: string;
  callback: (url: string) => void;
}
```

### 4. Complete Example

```svelte
<script lang="ts">
  import RichTextEditor from '$lib/components/editor/rich-text-editor.svelte';
  import { toast } from 'svelte-sonner';
  
  let content = '';
  
  async function handleImageUpload(event: CustomEvent) {
    const { file, alt, callback } = event.detail;
    
    try {
      // Show loading toast
      toast.loading('Uploading image...');
      
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);
      formData.append('alt', alt);
      
      // Upload to your backend
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      
      // Success - call callback with the URL
      callback(result.url);
      toast.success('Image uploaded successfully!');
      
    } catch (error) {
      console.error('Upload error:', error);
      callback(''); // Signal failure
      toast.error('Failed to upload image');
    }
  }
</script>

<RichTextEditor 
  bind:content={content}
  on:imageUpload={handleImageUpload}
  placeholder="Start writing..."
/>
```

## Features Implemented

1. **Fixed Image Insertion**: Images now insert at the cursor position instead of at the top
2. **Local File Upload**: Users can upload files from their device
3. **Horizontal Rule Fixed**: HR now displays properly with better styling
4. **Enhanced Code Blocks**: Better code insertion with proper styling
5. **Improved Paste Handling**: Better handling of pasted code and text formatting
6. **Upload Progress**: Shows uploading state during file upload
7. **Error Handling**: Proper error handling for failed uploads

## Upload Method Options

The editor provides two upload methods:

1. **URL**: Direct image URL input (existing functionality)
2. **File Upload**: Local file selection with backend upload

Users can switch between these methods using the toggle buttons in the image dialog.

## File Validation

The file input automatically accepts only image files (`accept="image/*"`). You can add additional validation in your upload handler as needed.

## Styling

The editor maintains consistent styling with your design system and properly handles both light and dark themes.

const editorConfig = {
  toolbar: {
      items: [
          'alignment',  // Displaying the proper UI element in the toolbar.
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo'
      ]
  },
  language: 'en',
  image: {
      toolbar: [
          'imageTextAlternative',
          'toggleImageCaption',
          'imageStyle:inline',
          'imageStyle:block',
          'imageStyle:side'
      ]
    }
};

export default editorConfig;
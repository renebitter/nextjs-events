import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  //used for react portals i.e. - render children into a DOM node that exists outside the DOM hierarchy of the parent component
  // <div id='overlays' />

  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <div id='overlays' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

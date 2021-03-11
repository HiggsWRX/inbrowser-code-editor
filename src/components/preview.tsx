import React, { useRef, useEffect } from "react";

import "./preview.css";

interface PreviewProps {
  code: string;
  bundlingStatusError: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root">
          <script>
            const handleError = (err) => {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.err(err);
            };

            window.addEventListener('message', (event) => {
              try {
                eval(event.data);
              } catch (err) {
                handleError(err);
              }
            }, false);

            window.addEventListener('err', (event) => {
              event.preventDefault();
              handleError(event.err);
            });
          </script>
        </div>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatusError }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="code-preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />

      {bundlingStatusError && (
        <div className="preview-error">
          <h4>Building Error</h4>
          {bundlingStatusError}
        </div>
      )}
    </div>
  );
};

export default Preview;

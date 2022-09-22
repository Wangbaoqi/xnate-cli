import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import rangeParser from 'parse-numeric-range';
import theme from '../../../../common/theme/codeTheme';
import { Copy, Light } from '@xnate-design/icons';

const calculateLinesToHighlight = (raw) => {
  const lineNumbers = rangeParser(raw);
  if (lineNumbers) {
    return (index: number) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

const copyToClipboard = (str: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str).then(
      function () {
        console.log('Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Could not copy text: ', err);
      },
    );
  } else if (window.clipboardData) {
    // Internet Explorer
    window.clipboardData.setData('Text', str);
  }
};

const CodePre = (props) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const childProps = props.children || {};
  const { className = '', children = '', live = false, file = '', light = '' } = childProps.props || {};
  const code = children.trim();
  const language = className.replace(/language-/, '');
  const highlights = calculateLinesToHighlight(light || '');

  return (
    <div className="xnate-site-md__code">
      <div className="xnate-site-md__code-tab">
        <div className="xnate-site-md__code-tab-left">{file && `${file}`}</div>
        <div className="xnate-site-md__code-tab-right">
          <span
            className="xnate-site-md__code-tab-icon"
            onClick={() => {
              copyToClipboard(code);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 1000);
            }}
          >
            {isCopied ? '🎉 Copied!' : <Copy fontSize="22px" />}
          </span>
        </div>
      </div>
      <div className="xnate-site-md__code-box">
        <Highlight {...defaultProps} code={code} language={language} theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className="xnate-site-md__code-box-pre font-source-code">
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  style={{
                    background: highlights(i) ? '#00f5c426' : 'transparent',
                    display: 'block',
                    lineHeight: '1.375',
                  }}
                >
                  <span className="xnate-site-md__code-box-number">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodePre;

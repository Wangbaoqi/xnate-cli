import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import rangeParser from 'parse-numeric-range';
import theme from '../../../../common/theme/codeTheme';

const calculateLinesToHighlight = (raw) => {
  const lineNumbers = rangeParser(raw);
  if (lineNumbers) {
    return (index: number) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

const copyToClipboard = (str) => {
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
    <div className="rounded-lg my-16 pl-3 pb-4 shadow-3xl bg-playground-bg md:-mx-3">
      <div className="flex relative pb-4">
        {language ? (
          <div className="h-7 mx-1 -mt-7 px-2 text-tiny rounded-tl-md rounded-tr-md  bg-playground-bg uppercase  flex justify-center items-center">{`${language}`}</div>
        ) : (
          ''
        )}
        <div
          className="flex justify-center items-center italic"
          style={{
            color: 'var(--fg-active)',
          }}
        >
          {file && `${file}`}
        </div>
        <button
          className=" absolute right-5 top-4 hover:text-anchor-color py-2 px-3 border-none rounded-lg cursor-pointer text-sm font-SourceCode leading-4"
          onClick={() => {
            copyToClipboard(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1000);
          }}
        >
          {isCopied ? '🎉 Copied!' : 'copy'}
        </button>
      </div>
      <div
        className=" overflow-auto rounded-lg "
        style={{
          background: 'var(--bg-default)',
        }}
      >
        <Highlight {...defaultProps} code={code} language={language} theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className="bg-transparent min-w-full text-pre font-SourceCode">
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  style={{
                    background: highlights(i) ? '#00f5c426' : 'transparent',
                    display: 'block',
                  }}
                >
                  <span className="inline-block mr-4 w-5 text-right">{i + 1}</span>
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

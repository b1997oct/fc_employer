import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false, loading: () => <div>Editor Loading...</div> })
import 'react-quill/dist/quill.snow.css';

const quillModules = {
  toolbar: {
    container: [
      ['bold'],
      [{ list: 'bullet' }, { list: 'ordered' }],
    ],
  },
}


export default function Editor({ value, onChange, placeholder }) {

  return (
    <ReactQuill
      modules={quillModules}
      className='editor'
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      formats={['bold', 'list']}
    />
  )
}


export function htmlToJSON(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const elements = doc.querySelectorAll('p, ul, ol, br');
  const result = [];

  function textConvert(element) {
    const arr = [];
    for (const node of element.childNodes) {
      if (node.nodeType === 3) {
        arr.push({ text: node.nodeValue });
      } else if (node.nodeType === 1 && node.tagName.toLowerCase() === 'strong') {
        arr.push({ tag: 'strong', text: node.textContent });
      }
    }

    return arr;
  }

  elements.forEach((element) => {
    const tag = element.tagName.toLowerCase();
    const r = { tag };

    if (tag === 'ul' || tag === 'ol') {
      const liElements = Array.from(element.querySelectorAll('li'));
      r.children = liElements.map((liElement) => textConvert(liElement));
    } else if (tag !== 'br') {
      r.children = textConvert(element);
    }

    result.push(r);
  });

  return result;
}
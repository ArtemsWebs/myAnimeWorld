import React, { useCallback, useRef, useState } from 'react';
import {
  AiOutlineStrikethrough,
  AiOutlineBold,
  AiOutlineUnderline,
  AiOutlineItalic,
} from 'react-icons/ai';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { MarkButton } from '@/app/ui/Editor/component/MarkButton';
import { ElementRender } from '@/app/ui/Editor/component/ElemenRender';
import { LeafRender } from '@/app/ui/Editor/component/LifeRender/LiefRender';
import { Divider } from '@/app/ui';
import classes from './Editor.module.scss';

import { PiEyeSlash } from 'react-icons/pi';

const initialValue = [
  {
    type: 'paragraph' as 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const textDecorationOptions = [
  {
    icon: <AiOutlineBold />,
    format: 'bold',
  },
  {
    icon: <AiOutlineUnderline />,
    format: 'underline',
  },
  {
    icon: <AiOutlineItalic />,
    format: 'italic',
  },
  {
    icon: <AiOutlineStrikethrough />,
    format: 'strike',
  },
  {
    icon: <PiEyeSlash />,
    format: 'spoiler',
  },
];

export default function MyEditor() {
  const renderElement = useCallback(
    (props) => <ElementRender {...props} />,
    [],
  );
  const renderLeaf = useCallback((props) => <LeafRender {...props} />, []);

  const [editor] = useState(() => withReact(createEditor()));
  return (
    <div
      style={{ minHeight: '6em', cursor: 'text' }}
      className={
        'p-3 rounded bg-zinc-50 border-zinc-200 border-2 hover:border-indigo-500 transition-colors duration-300'
      }
    >
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className={classes.editable}
          spellCheck
        />
        <Divider orientation={'horizontal'} />
        <div className={'flex gap-6'}>
          {textDecorationOptions.map((value) => {
            return (
              <MarkButton
                key={value.format}
                format={value.format}
                CustomIcon={value.icon}
              />
            );
          })}
        </div>
      </Slate>
    </div>
  );
}

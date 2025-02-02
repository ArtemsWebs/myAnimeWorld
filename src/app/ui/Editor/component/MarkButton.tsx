import { ReactEditor, useSlate } from 'slate-react';
import { IconButton } from '@/app/ui';
import { ReactNode } from 'react';
import { BaseEditor, Editor } from 'slate';
import { HistoryEditor } from 'slate-history';

interface MarkButtonProps {
  CustomIcon: ReactNode;
  format: string;
}

const isMarkActive = (
  editor: BaseEditor & ReactEditor & HistoryEditor,
  format: 'text',
) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const MarkButton = ({ format, CustomIcon }: MarkButtonProps) => {
  const editor = useSlate();
  return (
    <IconButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {CustomIcon}
    </IconButton>
  );
};

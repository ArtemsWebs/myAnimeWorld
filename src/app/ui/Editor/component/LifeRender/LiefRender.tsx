import { RenderLeafProps } from 'slate-react/dist/components/editable';
import { Typography } from '@/app/ui';
import classes from './LifeRender.module.scss';

export const LeafRender = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.strike) {
    children = <s>{children}</s>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.spoiler) {
    children = (
      <span className={classes.spoiler}>
        <Typography
          contentEditable={'false'}
          className={'text-sky-400 cursor-pointer'}
          variant={'regular'}
        >
          {`cпойлер: `}
        </Typography>
        {children}
      </span>
    );
  }

  return <span {...attributes}>{children}</span>;
};

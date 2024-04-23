import Typography from '@/app/_widget/Typography';

const CommentTree = () => {
  return (
    <div className={'w-full min-h-5 bg-gray-400 rounded-lg px-6 py-6 mt-10'}>
      <Typography variant={'title'} className={'text-white'}>
        Комментарии:
      </Typography>
    </div>
  );
};

export default CommentTree;

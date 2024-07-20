import Typography from '@/app/ui/Typography';
import { FaQuestion } from 'react-icons/fa6';

const UserDocumential = () => {
  return (
    <div className="bg-teal-400">
      <div className="w-full mb-7">
        <div className="bg-white h-[40px] w-[40px] rounded-lg">
          <div className="bg-teal-400">
            <FaQuestion />
          </div>
        </div>
      </div>
      <Typography component="p" variant="title" className="text-white">
        Нужна помощь ?
      </Typography>
      <Typography component="p" variant="subtitle" className="text-white">
        Просмотрите нашу документацию
      </Typography>
      <button className="w-[186px] h-6 text-center">Документация</button>
    </div>
  );
};

export default UserDocumential;

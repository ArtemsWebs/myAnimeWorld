import SuccesButton from '../SuccesButton/SuccesButton';

interface FormButtonBlockProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const FormButtonBlock = ({ onSuccess, onCancel }: FormButtonBlockProps) => {
  return (
    <div className="flex justify-end gap-12">
      <SuccesButton className={'w-[200px]'} onClick={onCancel}>
        Назад
      </SuccesButton>
      <SuccesButton onClick={onSuccess} className={'w-[200px]'}>
        Сохранить
      </SuccesButton>
    </div>
  );
};

export default FormButtonBlock;

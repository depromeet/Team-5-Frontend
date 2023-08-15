'use client';

import { Button } from '@/common';

import { NicknameBox } from './components/NicknameBox';
import { useCreateNicknameForm } from './hooks/useCreateNicknameForm';

const Nickname = () => {
  const {
    register,
    errors,
    isDisabled,
    isMaxLength,
    isMinLength,
    isRequiredText,
    hasExclamationMark,
    nicknameMutation,
  } = useCreateNicknameForm();

  return (
    <div className="relative h-main pt-86px">
      <form
        onSubmit={(e) => {
          e.preventDefault(), nicknameMutation();
        }}
      >
        <NicknameBox
          register={register}
          isMaxLength={isMaxLength}
          isMinLength={isMinLength}
          isRequiredText={isRequiredText}
          hasExclamationMark={hasExclamationMark}
          errors={errors}
          boxDescription="내 이름은 똑스야! 너의 이름은 뭐니?"
        />
        <Button
          className="absolute bottom-20px w-full"
          size="L"
          typo="subheadingBold"
          backgroundColor="primaryDefault"
          disabled={isDisabled}
        >
          완료
        </Button>
      </form>
    </div>
  );
};

export default Nickname;

import clsx from 'clsx';
import Image from 'next/image';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { ICON_URL, Input, Text, bgColor } from '@/common';

import { CheckNicknameFormValues } from '../hooks/useCreateNicknameForm';

type NicknameBoxProps = {
  register: UseFormRegister<CheckNicknameFormValues>;
  isRequiredText: () => string;
  hasExclamationMark: (pattern: RegExp) => {
    value: RegExp;
    message: string;
  };
  isMaxLength: (maxLength: number) => {
    value: number;
    message: string;
  };
  isMinLength: (minLength: number) => {
    value: number;
    message: string;
  };
  errors: FieldErrors<CheckNicknameFormValues>;
  boxDescription: string;
};

export const NicknameBox = ({
  register,
  isRequiredText,
  isMaxLength,
  isMinLength,
  hasExclamationMark,
  errors,
  boxDescription,
}: NicknameBoxProps) => {
  return (
    <div
      className={clsx(
        bgColor['gray110'],
        'flex w-full flex-col items-center rounded-16px px-16px py-24px'
      )}
    >
      <Image
        src={ICON_URL.EMOJI_DROOLING}
        alt="똑스 아이콘"
        width={52.5}
        height={52.5}
      />
      <div className="mt-16px flex w-full flex-col items-center">
        <Text typo="headingM" color="white">
          {boxDescription}
        </Text>
        <Input
          {...register('nickname', {
            required: isRequiredText(),
            minLength: isMinLength(2),
            maxLength: isMaxLength(6),
            pattern: hasExclamationMark(/^[a-zA-Z0-9가-힣]+$/i),
          })}
          autoFocus
          className="mt-40px"
          label="닉네임 입력"
          errorMessage={errors.nickname?.message}
        />
      </div>
    </div>
  );
};

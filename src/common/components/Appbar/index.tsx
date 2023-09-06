'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ICON_URL } from '@/common/constants';
import { useAuth } from '@/common/hooks';

import { SSRSuspense } from '../SSRSuspense';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

export const Appbar = () => {
  const router = useRouter();
  const { isLogin } = useAuth();

  // TODO: useAppbar hook 구현
  return (
    <SSRSuspense
      fallback={<div className="h-54px bg-gray-120">로딩중입니다..</div>}
    >
      <nav className="sticky left-0 right-0 top-0 z-50 h-54px bg-gray-120">
        <div className="flex h-full w-full items-center justify-between">
          <div className="flex items-center gap-4px">
            <Image
              layout="fixed"
              width={60}
              height={20}
              src={ICON_URL.TOKS_LOGO}
              alt="toks 로고"
            />
            {/* TODO: POPOVER 구현 */}
            <Tooltip isFirstRender message="관심있는 카테고리를 선택해보세요">
              <button type="button">
                <Image
                  src={ICON_URL.CHEVRON_DOWN}
                  alt="카테고리 드롭다운"
                  width={24}
                  height={24}
                />
              </button>
            </Tooltip>
          </div>
          <button className="flex items-center">
            {/* TODO: 로그인 여부 분기 */}
            {isLogin ? (
              <Image
                src={ICON_URL.AVATAR_DEFAULT}
                alt="아바타 기본 이미지"
                width={30}
                height={30}
                onClick={() => {
                  router.replace('/my-page');
                }}
              />
            ) : (
              <Text
                color="gray10"
                typo="body"
                onClick={() => {
                  router.replace(
                    'https://api.tokstudy.com/oauth2/authorize/kakao'
                  );
                }}
              >
                로그인
              </Text>
            )}
          </button>
        </div>
      </nav>
    </SSRSuspense>
  );
};

import { CACHE_KEYS } from './constants';

export const getUserVerifyKey = (email: string) =>
  `${CACHE_KEYS.USER_VERIFICATION_CODE}${email}`;

export const generate6DigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

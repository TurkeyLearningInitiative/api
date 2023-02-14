export enum Roles {
  Admin = 'admin',
  Student = 'student',
  Moderator = 'moderator',
  Default = 'default',
}

export const CACHE_KEYS = {
  USER_VERIFICATION_CODE: 'USER_VERIFICATION_CODE_',
};

export const templates = {
  EmailVerify: 'email_verify.html',
};

export const DEFAULT_HERO_IMAGES = {
  DEFAULT: 'https://cdn-icons-png.flaticon.com/512/2735/2735314.png',
};

export const MAXIMUM_FILE_SIZE = 100;

export type EmailTemplateName = keyof typeof templates;

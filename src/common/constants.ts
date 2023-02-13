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

export type EmailTemplateName = keyof typeof templates;

export type AuthFormState = {
  error?: string;
  success?: string;
};

export type AuthUser = {
  id: string;
  email: string | undefined;
};

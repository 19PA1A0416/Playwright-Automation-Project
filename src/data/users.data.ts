export type User = {
  username: string;
  password: string;
};

/**
 * Sauce Demo publishes these accounts for practice. Override them with
 * environment variables if you point the suite at another site later.
 */
export const users = {
  standard: {
    username: process.env.SAUCE_USERNAME ?? 'standard_user',
    password: process.env.SAUCE_PASSWORD ?? 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
} as const satisfies Record<string, User>;

export const loginErrors = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
} as const;

/**
 * Route yang bisa diakses oleh public user
 */
export const publicRoutes = ["/", "/search", "/foods", "/api/food"];

/**
 * Route yang hanya bisa diakses user yang telah login
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * Route untuk auth Api
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Route default saat user telah login
 */
export const DEFAULT_LOGIN_REDIRECT = "/account";

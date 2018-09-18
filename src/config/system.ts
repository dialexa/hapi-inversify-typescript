export default {
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  SESSION_TTL: parseInt(process.env.SESSION_TTL, 10) || 60 * 60 * 24 * 7
}

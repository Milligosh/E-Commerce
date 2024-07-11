export const BlacklistQueries = {
    addToken: `INSERT INTO token_blacklist (token) VALUES ($1)`,
    checkToken: `SELECT * FROM token_blacklist WHERE token = $1`,
  };
  
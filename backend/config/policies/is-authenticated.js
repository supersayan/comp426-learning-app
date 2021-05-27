'use strict';

/**
 * `is-authenticated` policy.
 */

module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    return await next();
  }

  ctx.unauthorized('Not logged in.');
};

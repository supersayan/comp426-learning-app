'use strict';

module.exports = async (ctx, next) => {
  if (ctx.state.user.role.name === 'Editor') {
    return await next();
  }

  ctx.unauthorized('Not an editor.');
};

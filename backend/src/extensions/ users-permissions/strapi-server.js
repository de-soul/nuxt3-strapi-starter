const utils = require('@strapi/utils');
const {sanitize} = utils;

const sanitizeOutput = (user, ctx) => {
  const schema = strapi.getModel('plugin::users-permissions.user');
  const {auth} = ctx.state;
  return sanitize.contentAPI.output(user, schema, {auth});
};

module.exports = (plugin) => {
  // Override users/me controller
  plugin.controllers.user.me = async (ctx) => {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized();
    }
    user.access = user.role
    ctx.body = await sanitizeOutput(user, ctx);
  }
  return plugin;
}

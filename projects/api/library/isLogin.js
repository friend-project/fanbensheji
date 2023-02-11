module.exports = async (ctx, next) => {
  const login = ctx.cookies.get('login')
  if (
    !login
    && ctx.request.url.startsWith('/api')
    && ctx.request.url !== '/api/login'
  ) {
    ctx.body = {
      code: 2,
      msg: '用户未登录',
      data: '/login',
    }
  } else {
    await next()
  }
}

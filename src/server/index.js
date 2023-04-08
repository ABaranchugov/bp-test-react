const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const KoaRouter = require('koa-router');
const users = require('./users.json');

const port = 3001;
const koa = new Koa();
const router = new KoaRouter();
var slow = require('koa-slow');

router
  .post('/checkUser', (ctx, next) => {
    const {email, password} = ctx.request.body;

    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = 'Wrong email or password';
    } else if (!users.find(user => user.email === email && user.password === password)) {
      ctx.response.status = 404;
      ctx.response.body = 'Wrong user email or password';
    } else {
      ctx.response.status = 200;
      ctx.response.body = 'Ok';
    }

    return next();
  });

koa
  .use(slow({
    url: /.*\/checkUser.*/i,
    delay: 2000
  }))
  .use(KoaBodyParser())
  .use(router.routes())
  .listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
  });
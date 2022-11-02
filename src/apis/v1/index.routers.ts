import { AuthRouter } from "../auth/auth.route";
import { UserRouter } from "../user/user.route";

import express from 'express';
import '../../shared/middlewares/passport.mdw';
import { PostRouter } from "../post/post.route";
import { PageRouter } from "../page/page.route";
import { GroupRouter } from "../group/group.route";
const passport = require("passport");

let routersV1 = express.Router();

routersV1.use(new AuthRouter().router)
routersV1.use(passport.authenticate('jwt', { session: false }), new UserRouter().router)
routersV1.use(passport.authenticate('jwt', { session: false }), new PostRouter().router)
routersV1.use(passport.authenticate('jwt', { session: false }), new PageRouter().router)
routersV1.use(passport.authenticate('jwt', { session: false }), new GroupRouter().router)


export { routersV1 };


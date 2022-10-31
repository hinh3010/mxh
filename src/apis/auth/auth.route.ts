
import { AuthController } from './auth.controller';
import { BaseRouter } from "../../shared/router";
import passport from "passport"
import '../../shared/middlewares/passport.mdw'

export class AuthRouter extends BaseRouter<AuthController> {
    constructor() {
        super(AuthController)
    }

    routes(): void {

        this.router.route('/login')
            .post(
                passport.authenticate('local', { session: false }),
                this.controller.login
            )

        this.router.route('/register')
            .post(
                this.controller.register
            )

        this.router.route('/refreshToken')
            .post(
                this.controller.refreshToken
            )
    }
}

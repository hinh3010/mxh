//// C3
import { BaseRouter } from "../../shared/router";
import { UserInfoController } from "./userInfo.controller";


export class UserInfoRouter extends BaseRouter<UserInfoController> {
    constructor() {
        super(UserInfoController)
    }

    routes(): void {

        this.router.route('/users')
            .get(
                this.controller.getUsers
            )

        this.router.route('/user/:id')
            .get(
                this.controller.getUserById
            )
            .patch(
                this.controller.updateUserById
            )
    }
}




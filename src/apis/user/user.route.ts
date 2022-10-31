//// C3
import { UserController } from './user.controller';
import { BaseRouter } from "../../shared/router";


export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController)
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





// C1
// import express from 'express';
// import { UserController } from '../controllers/user.controller';

// const router = express.Router({ mergeParams: true });

// const userController = new UserController()

// router.get('/users', userController.getUsers)
// router.route('/user/:id')
//     .get(userController.getUserById)


// export const userRouter = router


//// C2
// import { UserController } from '../controllers/user.controller';
// import { BaseRouter } from "../../../shared/routers/router";
// import { Router } from 'express';
// class UserRouter {
//     public router: Router;
//     public controller: UserController
//     constructor() {
//         this.router = Router()
//         this.controller = new UserController()
//         this.routes()
//     }

//     routes(): void {
//         this.router.get('/users', this.controller.getUsers)
//     }
// }
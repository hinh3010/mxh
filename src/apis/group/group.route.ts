import { GroupController } from './group.controller';
import { BaseRouter } from "../../shared/router";
import validate from '../../shared/middlewares/validate.mdw';
import { GroupValidate } from './group.validate';

const groupValidate = new GroupValidate()

export class GroupRouter extends BaseRouter<GroupController> {
    constructor() {
        super(GroupController)
    }

    routes(): void {

        this.router.route('/groups')
            .get(
                validate(groupValidate.getAllGroup()),
                this.controller.getAll
            )

        this.router.route('/group')
            .post(
                validate(groupValidate.createGroup()),
                this.controller.create
            )

        this.router.route('/group/:id')
            .get(
                this.controller.getById
            )
            .patch(
                validate(groupValidate.updateGroup()),
                this.controller.updateById
            )
            .delete(
                this.controller.deleteById
            )
    }
}



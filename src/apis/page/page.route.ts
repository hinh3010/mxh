import { PageController } from './page.controller';
import { BaseRouter } from "../../shared/router";
import validate from '../../shared/middlewares/validate.mdw';
import { PageValidate } from './page.validate';

const pageValidate = new PageValidate()

export class PageRouter extends BaseRouter<PageController> {
    constructor() {
        super(PageController)
    }

    routes(): void {

        this.router.route('/pages')
            .get(
                validate(pageValidate.getAllPage()),
                this.controller.getAll
            )

        this.router.route('/page')
            .post(
                validate(pageValidate.createPage()),
                this.controller.create
            )

        this.router.route('/page/:id')
            .get(
                this.controller.getById
            )
            .patch(
                validate(pageValidate.updatePage()),
                this.controller.updateById
            )
            .delete(
                this.controller.deleteById
            )
    }
}



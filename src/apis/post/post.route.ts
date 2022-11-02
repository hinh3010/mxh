//// C3
// import { CheckRole } from '../../shared/middlewares/admin.mdw';
import validate from '../../shared/middlewares/validate.mdw';
import { BaseRouter } from "../../shared/router";
import { PostController } from './post.controller';
import { PostValidate } from './post.validate';


const postValidate = new PostValidate()
// const checkRole = new CheckRole()
export class PostRouter extends BaseRouter<PostController> {
    constructor() {
        super(PostController)
    }

    routes(): void {

        this.router.route('/posts')
            .get(
                validate(postValidate.getAllPost()),
                this.controller.getPosts
            )

        this.router.route('/posts/targetById')
            .get(
                validate(postValidate.getAllPostByTargetId()),
                this.controller.getPostsByTargetId
            )

        this.router.route('/post')
            .post(
                validate(postValidate.createPost()),
                this.controller.createPost
            )

        this.router.route('/post/:id')
            .get(
                this.controller.getPostById
            )
            .patch(
                validate(postValidate.updatePost()),
                this.controller.updatePostById
            )
            .delete(
                // checkRole.asSuperAdmin,
                this.controller.deletePostById
            )
    }
}



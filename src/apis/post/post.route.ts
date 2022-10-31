//// C3
import { PostController } from './post.controller';
import { BaseRouter } from "../../shared/router";


export class PostRouter extends BaseRouter<PostController> {
    constructor() {
        super(PostController)
    }

    routes(): void {

        this.router.route('/posts')
            .get(
                this.controller.getPosts
            )
        this.router.route('/posts/targetId')
            .get(
                this.controller.getPostsByTargetId
            )

        this.router.route('/post')
            .post(
                this.controller.createPost
            )

        this.router.route('/post/:id')
            .get(
                this.controller.getPostById
            )
            .patch(
                this.controller.updatePostById
            )
    }
}



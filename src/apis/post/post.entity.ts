import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../shared/base.entity";
import { CMS_STATUS_TYPE, POST_TARGET_EMTITY_TYPE, POST_TYPE, POST_VISIBLE_TYPE } from "../../types/enumTypes";
import { Table } from "../../types/tableTypes";
import { UserEntity } from "../user/user.entity";


@Entity({ name: Table.post })
export class PostEntity extends BaseEntity {

    @Column({ default: null })
    content!: string

    @Column("text", { array: true, default: [] })
    attachments!: string[]

    @Column("text", { array: true, default: [] })
    links!: string[]

    @Column({ default: null })
    address!: string

    @Column({ type: 'enum', enum: POST_TYPE, default: POST_TYPE.NORMAL })
    postType!: POST_TYPE

    @Column({ type: 'enum', enum: POST_VISIBLE_TYPE, default: POST_VISIBLE_TYPE.PUBLIC })
    postVisible!: POST_VISIBLE_TYPE

    @Column({ type: 'enum', enum: CMS_STATUS_TYPE, default: CMS_STATUS_TYPE.ACTIVE })
    cmsStatus!: CMS_STATUS_TYPE

    @Column({ type: 'enum', enum: POST_TARGET_EMTITY_TYPE, default: POST_TARGET_EMTITY_TYPE.USER })
    targetEntity!: POST_TARGET_EMTITY_TYPE

    @Column()
    targetById!: string


    // ko chay dc
    // targetBy!: any
    // @AfterLoad()
    // public async setTargetBy() {
    //     if (this.targetEntity === POST_TARGET_EMTITY_TYPE.USER) {
    //         // this.targetBy = await userService.findById(this.targetById)
    //         console.log(this.targetById)
    //     }
    //     //  else if (this.targetEntity === POST_TARGET_EMTITY_TYPE.GROUP) {
    //     //     this.targetBy = GroupEntity
    //     // } else if (this.targetEntity === POST_TARGET_EMTITY_TYPE.PAGE) {
    //     //     this.targetBy = PageEntity
    //     // }
    // }

    @Column("text", { array: true, default: [] })
    tags!: string[]

    // created by
    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: "user_id" })
    createdBy!: UserEntity

    createdById!: string | null
    @AfterLoad()
    setCreatedById() {
        this.createdById = this.createdBy?.id || null
    }
    //
}

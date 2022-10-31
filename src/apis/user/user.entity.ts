import { Column, Entity, JoinColumn, OneToMany, OneToOne, RelationId } from "typeorm";
import { BaseEntity } from "../../shared/base.entity";
import { GENDER_TYPE, LOGIN_TYPE, ROLE_TYPE } from "../../types/enumTypes";
import { Table } from "../../types/tableTypes";
import { PostEntity } from "../post/post.entity";
import { UserInfoEntity } from "../userInfo/userInfo.entity";

@Entity({ name: Table.user })
export class UserEntity extends BaseEntity {

    // dk
    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    displayName!: string

    @Column({ unique: true })
    email!: string

    @Column({ unique: true })
    phone!: string

    @Column({ select: false })
    password!: string

    @Column({ type: 'enum', enum: GENDER_TYPE, default: null })
    gender!: GENDER_TYPE

    // 
    @Column({ type: 'enum', enum: LOGIN_TYPE, default: LOGIN_TYPE.ACCOUNT })
    loginType!: LOGIN_TYPE

    @Column({ type: 'enum', enum: ROLE_TYPE, default: ROLE_TYPE.USER })
    role!: ROLE_TYPE

    @Column({ default: true })
    isActive!: boolean

    // 
    @Column({ default: null })
    avatar!: string

    @Column({ default: null })
    dateOfBirth !: Date

    @Column({ default: null })
    description!: string

    @Column({ default: null })
    favorites!: string


    // *** //

    // quan he 1 - 1 vs table user info
    @OneToOne(() => UserInfoEntity, (userInfo) => userInfo.id)
    @JoinColumn({ name: "user_info_id" })
    userInfoId!: UserInfoEntity;

    @OneToMany(() => PostEntity, (post) => post.createdById)
    @JoinColumn({ name: "post_id" })
    posts!: PostEntity[];


    // @RelationId((user: UserInfoEntity) => user.id) 
    // userInfo_Id!: UserInfoEntity;
    // you need to specify target relation


    // @ManyToOne(() => RoleEntity, (role) => role.userIds)
    // @JoinColumn({ name: "id" })
    // roleId!: RoleEntity;
}

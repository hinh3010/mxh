import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../shared/base.entity";
import { Table } from "../../types/tableTypes";
import { UserEntity } from "../user/user.entity";

@Entity({ name: Table.page })
export class PageEntity extends BaseEntity {

    @Column()
    name!: string

    @Column({ default: null })
    description!: string

    @Column({ default: null })
    avatar!: string

    @Column({ default: null })
    banner!: string

    @Column({ default: null })
    website!: string

    @Column({ default: null })
    hotline!: string

    @Column({ default: null })
    address!: string


    // created by
    @ManyToOne(() => UserEntity, (user) => user.pages)
    @JoinColumn({ name: "user_id" })
    createdBy!: UserEntity

    createdById!: string | null

    @AfterLoad()
    setCreatedById() {
        this.createdById = this.createdBy?.id || null
    }
    //



}

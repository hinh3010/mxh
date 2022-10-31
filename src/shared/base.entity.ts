import {
    Column,
    CreateDateColumn, DeleteDateColumn, Index, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

export abstract class BaseEntity {
    @Index({ unique: true })
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
    })
    updatedAt!: Date;

    @DeleteDateColumn({
        name: "deleted_at",
        type: "timestamp",
        default: null,
    })
    deletedAt!: Date;

}
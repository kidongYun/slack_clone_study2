import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Channel from './Channel'

@Entity()

class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text", nullable: false})
    nickname: string;

    @Column({type: "text", nullable: false})
    content: string;

    @ManyToOne(type => Channel, channel => channel.messages)
    innerChannel: Channel;

    @Column({type: "text", nullable: false})
    innerChannelId: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Message;
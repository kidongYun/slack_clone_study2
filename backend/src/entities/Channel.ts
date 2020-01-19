import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Message from "./Message";

@Entity()
class Channel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text", nullable: false})
    channelName: string;

    // 본인과 대상의 관계가 1: N 관계를 표현하기 위한 어노테이션. 대상의 관계가 N임으로 이를 표현하기 위해 배열을 사용하고 있음을 볼 수 있다.
    @OneToMany(type => Message, message => message.innerChannel)
    messages: Message[]

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

}

export default Channel
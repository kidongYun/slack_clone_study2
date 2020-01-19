import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Channel from './Channel'
// 로컬에 만든 파일을 가져올 때는 확장자 생략이 가능하다.

@Entity()
// @Entity() : typeORM의 entity임을 선언
class Message extends BaseEntity {
    // @PrimaryGeneratedColumn() : mariaDB의 auto_increment와 유사한 역할, Primary Key로 사용할 목적
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({type: "text", nullable: false}) : 컬럼임을 가리키며 해당 컬럼의 스키마 타입과 null값 허용 여부 명시
    @Column({type: "text", nullable: false})
    nickname: string;

    @Column({type: "text", nullable: false})
    contenta: string;

    // 본인과 대상의 관계까 N : 1 임을 표현할 때 사용하는 어노테이션. Message : Channel = N : 1
    // type에는 대상이 되는 클래스 명을 적고 서로 관계되어있는 컬럼으로 연결지음.
    @ManyToOne(type => Channel, channel => channel.messages)
    innerChannel: Channel;

    @Column({type: "text", nullable: false})
    innerChannelId: number;

    // 테이블이 생성되는 시점을 저장하는 필드로 typeORM에서 제공하는 @CreateDateColumn()을 활용해서 바로 구현 가능
    @CreateDateColumn()
    createdAt: string;

    // 테이블이 생성되는 시점을 저장하는 필드로 typeORM에서 제공하는 @UpdateDateColumn()을 활용해서 바로 구현 가능
    @UpdateDateColumn()
    updatedAt: string;
}

export default Message;
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import {PostDetails} from "./PostDetails";
import {PostCategory} from "./PostCategory";
import {PostAuthor} from "./PostAuthor";
import {PostInformation} from "./PostInformation";
import {PostImage} from "./PostImage";
import {PostMetadata} from "./PostMetadata";

@Entity("Post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    // post has relation with category, however inverse relation is not set (category does not have relation with post set)
    @ManyToMany(type => PostCategory, {
        cascade: true
    })
    @JoinTable()
    PostCategory: PostCategory[];

    // post has relation with details. cascade inserts here means if new PostDetails instance will be set to this
    // relation it will be inserted automatically to the db when you save this Post entity
    @ManyToMany(type => PostDetails, details => details.Post, {
        cascade: true
    })
    @JoinTable()
    PostDetails: PostDetails[];

    // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
    // it will be inserted automatically to the db when you save this Post entity
    @ManyToMany(type => PostImage, image => image.Post, {
        cascade: true
    })
    @JoinTable()
    PostImage: PostImage[];

    // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
    // it will be inserted automatically to the db when you save this Post entity
    @ManyToMany(type => PostMetadata, metadata => metadata.Post)
    @JoinTable()
    PostMetadata: PostMetadata[];

    // post has relation with details. full cascades here
    @ManyToMany(type => PostInformation, information => information.Post, {
        cascade: true
    })
    @JoinTable()
    PostInformation: PostInformation[];

    // post has relation with details. not cascades here. means cannot be persisted, updated or removed
    @ManyToMany(type => PostAuthor, author => author.Post)
    @JoinTable()
    PostAuthor: PostAuthor[];

}

import { createProductComment, deleteProductComment, updateProductComment } from "@/API/ProductCommentAPI";
import { makeAutoObservable, runInAction } from "mobx";

export default class ProductCommentStore {
    constructor() {
        this._comments = [];
        this._selectedComment = {};

        makeAutoObservable(this);
    }

    setComments(comments) {
        this._comments = comments;
    }

    setSelectedComment(comment) {
        this._selectedComment = comment;
    }

    get comments() {
        return this._comments;
    }

    get selectedComment() {
        return this._selectedComment;
    }

    createComment = async (newComment) => {
        try {
            const data = await createProductComment(newComment);
            runInAction(() => {
                this._comments.push(data);
            });
        } catch (error) {
            console.error('Ошибка при создании отзыва:', error);
        }
    }

    editComment = async (id, editedComment) => {
        try {
            const data = await updateProductComment(id, editedComment);
            runInAction(() => {
                this._comments = this._comments.map(comment =>
                    comment.id_product_comment === id ? data : comment
                );
            });
        } catch (error) {
            console.error('Ошибка при редактировании отзыва:', error);
        }
    }

    deleteComment = async (id) => {
        try {
            await deleteProductComment(id);
            runInAction(() => {
                this._comments = this._comments.filter(comment =>
                    comment.id_product_comment !== id
                );
            });
        } catch (error) {
            console.error('Ошибка при удалении отзыва:', error);
        }
    };
}
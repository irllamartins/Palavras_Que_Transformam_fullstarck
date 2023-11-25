import { JsonUtils } from '../utils/json.util'

export enum TextType {
    COMMON = "common",
    CHALLENGE = "challenge"
}


export default class Text {

    private _id: string | undefined
    private _user_id: string | undefined
    private _title: string | undefined
    private _body: string | undefined
    private _created_at: string | undefined
    private _update_at: string | undefined
    private _goal: boolean | undefined
    private _number_words:number | undefined

    get id(): string | undefined {
        return this._id
    }

    set id(value: string | undefined) {
        this._id = value
    }
    get user_id(): string | undefined {
        return this._user_id
    }

    set user_id(value: string | undefined) {
        this._user_id = value
    }
    get title(): string | undefined {
        return this._title
    }

    set title(value: string | undefined) {
        this._title = value
    }

    get body(): string | undefined {
        return this._body
    }

    set body(value: string | undefined) {
        this._body = value
    }

    get created_at(): string | undefined {
        return this._created_at
    }

    set created_at(value: string | undefined) {
        this._created_at = value
    }
    get update_at(): string | undefined {
        return this._update_at
    }

    set update_at(value: string | undefined) {
        this._update_at = value
    }
    get goal(): boolean | undefined {
        return this._goal
    }

    set goal(value: boolean | undefined) {
        this._goal = value
    }
    get number_words(): number | undefined {
        return this._number_words   
    }
    set number_words(value: number | undefined) {
        this._number_words = value
    }
    // metodo responsavel por formatar os dados do backend para frontend
    public fromJSON(json: any): Text {
        if (!json) {
            return this
        }

        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json._id !== undefined) {
            this.id = json._id
        }
        if (json.user_id !== undefined) {
            this.user_id = json.user_id
        }
        if (json.title !== undefined) {
            this.title = json.title
        }

        if (json.body !== undefined) {
            this.body = json.body
        }

        if (json.created_at !== undefined) {
            this.created_at = json.created_at
        }
        if (json.update_at !== undefined) {
            this.update_at = json.update_at
        }
        if (json.goal !== undefined) {
            this.goal = json.goal
        }
        if (json.number_words !== undefined) {
            this.number_words = json.number_words
        }
        return this
    }

    // metodo responsavel para formatar os dados do front para o back
    public toJSON(): any {
        return {
            _id: this.id || undefined,
            user_id: this.user_id || undefined,
            title: this.title || undefined,
            body: this.body || undefined,
            created_at: this.created_at || undefined,
            update_at: this.update_at || undefined,
            goal: this.goal || undefined,
            number_words:this.number_words|| undefined

        }
    }
}
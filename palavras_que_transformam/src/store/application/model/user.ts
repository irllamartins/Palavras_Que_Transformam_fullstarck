import { JsonUtils } from '../utils/json.util'

export default class User {

    private _id: string | undefined
    private _name: string | undefined
    private _email: string | undefined
    private _password: string | undefined
    private _goal: number | undefined
    private _point: number | undefined

    get id(): string | undefined {
        return this._id
    }

    set id(value: string | undefined) {
        this._id = value
    }
    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }

    get email(): string | undefined {
        return this._email
    }

    set email(value: string | undefined) {
        this._email = value
    }

    get password(): string | undefined {
        return this._password
    }

    set password(value: string | undefined) {
        this._password = value
    }
    get goal(): number | undefined {
        return this._goal
    }

    set goal(value: number | undefined) {
        this._goal = value
    }
    get point(): number | undefined {
        return this._point
    }

    set point(value: number | undefined) {
        this._point = value
    }

    // metodo responsavel por formatar os dados do backend para frontend
    public fromJSON(json: any): User {
        if (!json) {
            return this
        }

        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.id !== undefined) {
            this.id = json.id
        }
        if (json.name !== undefined) {
            this.name = json.name
        }

        if (json.email !== undefined) {
            this.email = json.email
        }

        if (json.password !== undefined) {
            this.password = json.password
        }
        if (json.goal !== undefined) {
            this.goal = json.goal
        }
        if (json.point !== undefined) {
            this.point = json.point
        }
        return this
    }

    // metodo responsavel para formatar os dados do front para o back
    public toJSON(): any {
        return {
            id: this.id || undefined,
            name: this.name || undefined,
            email: this.email || undefined,
            password: this.password || undefined,
            goal: this.goal || undefined,
            point: this.point || undefined
        }
    }
}
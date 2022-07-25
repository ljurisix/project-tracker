import { SimpleBaseResponseInterface } from "../base/base.interface";

export interface RegisterInterface {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponseInterface extends SimpleBaseResponseInterface {}
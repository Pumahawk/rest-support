import { Context, RestResponse } from "../support";
import { Document } from "../documents/Document";
const axios = require('axios');

export abstract class Collection<T extends Document, P = string> {

    public abstract url(context: Context, param: P): string;
    public abstract documentGenerator(data: any): T;

    public get(param: P): Promise<RestResponse<T>> {
        const context = new Context();
        context.method = 'GET';
        const collection = this;
        return axios.get(this.url(context, param)).then((resp: any) => {
            return new RestResponse(collection.documentGenerator(resp.data));
        });
    }

    public add(document: T): Promise<RestResponse<T>> {
        const context = new Context();
        context.method = 'POST';
        const collection = this;
        return axios.post(this.url(context, param)).then((resp: any) => {
            return new RestResponse(collection.documentGenerator(resp.data));
        });
    }
}
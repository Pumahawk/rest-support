import { Context, RestResponse } from "../support";
import { Document } from "../documents/Document";
const axios = require('axios');

interface AxiosRes<D> {
    data: D;
}

export abstract class Collection<DReq, T extends Document<DReq, DRes>, Data = any, P = any, DRes = DReq> {

    public abstract url(context: Context, param: P | null): string;
    public abstract extract(data: DRes): T;
    public abstract serialize<D>(data: D): DReq;

    public async get(param: P): Promise<RestResponse<T>> {
        const context = new Context();
        context.method = 'GET';
        const collection = this;
        return axios.get(this.url(context, param)).then((resp: AxiosRes<DRes>) => {
            return new RestResponse(collection.extract(resp.data));
        });
    }

    public async create(document: Data): Promise<RestResponse<T>> {
        const context = new Context();
        context.method = 'POST';
        const collection = this;
        return axios.post(this.url(context, null), this.serialize(document)).then((resp: AxiosRes<DRes>) => {
            return new RestResponse(collection.extract(resp.data));
        });
    }
}
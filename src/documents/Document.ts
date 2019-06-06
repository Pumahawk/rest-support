import { Context, ActionReport, RestResponse } from "../support";
const axios = require('axios');

export abstract class Document<DReq, DRes = DReq> {

    public abstract url(context: Context): string;
    public abstract extractor(dto: DRes): void;
    public abstract serializer(): DReq;

    public async delete(): Promise<RestResponse<Document<DReq, DReq>>> {
        const context = new Context;
        context.method = "DELETE";
        const url = this.url(context);
        const document = this;
        return axios.delete(url).then((resp: any) => {
            this.extractor(resp.data);
            return new RestResponse(document);
        });
    }

    public async commit(): Promise<RestResponse<Document<DReq, DReq>>> {
        const context = new Context;
        context.method = "PUT";
        const url = this.url(context);
        const document = this;
        return axios.put(url, this.serializer()).then((resp: any) => {
            this.extractor(resp.data);
            return new RestResponse(document)
        });
    }

    public async update(): Promise<RestResponse<Document<DReq, DReq>>> {
        const context = new Context;
        context.method = "GET";
        const url = this.url(context);
        const document = this;
        return axios.get(url).then((resp: any) => {
            this.extractor(resp.data);
            return new RestResponse(document);
        });
    }
}
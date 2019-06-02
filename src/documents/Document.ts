import { Context, ActionReport, RestResponse } from "../support";
const axios = require('axios');

export abstract class Document<Dto = any, Data = Dto> {

    public data: Data | undefined;

    public abstract url(context: Context): string;
    public abstract extractor(dto: Dto): Data;
    public abstract serializer(data: Data): Dto;

    public async delete(): Promise<RestResponse<Document<Dto, Data>>> {
        const context = new Context;
        context.method = "DELETE";
        const url = this.url(context);
        const document = this;
        return axios.delete(url).then((resp: any) => {
            document.data = this.extractor(resp.data);
            return new RestResponse(document);
        });
    }

    public async commit(): Promise<RestResponse<Document<Dto, Data>>> {
        const context = new Context;
        context.method = "PUT";
        const url = this.url(context);
        const document = this;
        return axios.put(url).then((resp: any) => {
            document.data = this.extractor(resp.data);
            return new RestResponse(document)
        });
    }

    public async update(): Promise<RestResponse<Document<Dto, Data>>> {
        const context = new Context;
        context.method = "GET";
        const url = this.url(context);
        const document = this;
        return axios.get(url).then((resp: any) => {
            document.data = this.extractor(resp.data);
            return new RestResponse(document);
        });
    }
}
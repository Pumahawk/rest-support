import { Context, ActionReport, RestResponse, IRequestDispenser } from "../support";

export abstract class Document<DReq, DRes = DReq> {

    private request: IRequestDispenser<RestResponse<Document<DReq, DRes>>>;

    constructor(request: IRequestDispenser<RestResponse<Document<DReq, DRes>>>) {
        this.request = request;
    }

    public abstract url(context: Context): string;
    public abstract extractor(dto: DRes): void;
    public abstract serializer(): DReq;

    public async delete(): Promise<RestResponse<this>> {
        const context = new Context;
        context.method = "DELETE";
        const url = this.url(context);
        const document = this;
        return this.request.delete(url).then((resp: any) => {
            this.extractor(resp);
            return new RestResponse(document);
        });
    }

    public async commit(): Promise<RestResponse<this>> {
        const context = new Context;
        context.method = "PUT";
        const url = this.url(context);
        const document = this;
        return this.request.put(url, this.serializer()).then((resp: any) => {
            this.extractor(resp);
            return new RestResponse(document);
        });
    }

    public async update(): Promise<RestResponse<this>> {
        const context = new Context;
        context.method = "GET";
        const url = this.url(context);
        const document = this;
        return this.request.get(url).then((resp: any) => {
            this.extractor(resp);
            return new RestResponse(document);
        });
    }
}
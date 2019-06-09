import { Context, RestResponse, IRequestDispenser } from "../support";
import { Document } from "../documents/Document";

export abstract class Collection<DReq, T extends Document<DReq, DRes>, Data = any, P = any, DRes = DReq> {

    private request: IRequestDispenser<RestResponse<T>>;

    public abstract url(context: Context, param: P | null): string;
    public abstract extract(data: DRes): T;
    public abstract serialize<D>(data: D): DReq;

    constructor(request: IRequestDispenser<RestResponse<T>>) {
        this.request = request;
    }

    public async get(param: P): Promise<RestResponse<T>> {
        const context = new Context();
        context.method = 'GET';
        const collection = this;
        return this.request.get(this.url(context, param)).then((resp: any) => {
            return new RestResponse(collection.extract(resp));
        });
    }

    public async create(document: Data): Promise<RestResponse<T>> {
        const context = new Context();
        context.method = 'POST';
        const collection = this;
        return this.request.post(this.url(context, null), this.serialize(document)).then((resp: any) => {
            return new RestResponse(collection.extract(resp));
        });
    }
}
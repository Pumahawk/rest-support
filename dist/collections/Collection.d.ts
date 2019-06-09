import { Context, RestResponse, IRequestDispenser } from "../support";
import { Document } from "../documents/Document";
export declare abstract class Collection<DReq, T extends Document<DReq, DRes>, Data = any, P = any, DRes = DReq> {
    private request;
    abstract url(context: Context, param: P | null): string;
    abstract extract(data: DRes): T;
    abstract serialize<D>(data: D): DReq;
    constructor(request: IRequestDispenser<RestResponse<T>>);
    get(param: P): Promise<RestResponse<T>>;
    create(document: Data): Promise<RestResponse<T>>;
}

import { Context, RestResponse, IRequestDispenser } from "../support";
export declare abstract class Document<DReq, DRes = DReq> {
    private request;
    constructor(request: IRequestDispenser<RestResponse<Document<DReq, DRes>>>);
    abstract url(context: Context): string;
    abstract extractor(dto: DRes): void;
    abstract serializer(): DReq;
    delete(): Promise<RestResponse<this>>;
    commit(): Promise<RestResponse<this>>;
    update(): Promise<RestResponse<this>>;
}

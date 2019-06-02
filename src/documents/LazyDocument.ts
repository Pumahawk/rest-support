import { Document } from "./Document";
import { Context } from "../support";
export class LazyDocument<DtoResponse = any, Data = DtoResponse, DtoRequest = Data> extends Document<DtoResponse, Data, DtoRequest> {
    private urlMethod: (context: Context) => string;
    private extractorMethod: (dto: DtoResponse) => Data;
    private serializerMethod: (data: Data) => DtoRequest;
    constructor(data: Data, init: {
        url: (context: Context) => string;
        extractor: (dto: DtoResponse) => Data;
        serializer: (data: Data) => DtoRequest;
    }) {
        super(data);
        this.urlMethod = init.url;
        this.extractorMethod = init.extractor;
        this.serializerMethod = init.serializer;
    }
    public url(context: Context): string {
        return this.urlMethod(context);
    }
    public extractor(dto: DtoResponse): Data {
        return this.extractorMethod(dto);
    }
    public serializer(data: Data): DtoRequest {
        return this.serializerMethod(data);
    }
}

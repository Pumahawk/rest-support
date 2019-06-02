import { Document } from "./Document";
import { Context } from "../support";
export class LazyDocument<Dto = any, Data = Dto> extends Document<Dto, Data> {
    private urlMethod: (context: Context) => string;
    private extractorMethod: (dto: Dto) => Data;
    private serializerMethod: (data: Data) => Dto;
    constructor(init: {
        url: (context: Context) => string;
        extractor: (dto: Dto) => Data;
        serializer: (data: Data) => Dto;
    }) {
        super();
        this.urlMethod = init.url;
        this.extractorMethod = init.extractor;
        this.serializerMethod = init.serializer;
    }
    public url(context: Context): string {
        return this.urlMethod(context);
    }
    public extractor(dto: Dto): Data {
        return this.extractorMethod(dto);
    }
    public serializer(data: Data): Dto {
        return this.serializerMethod(data);
    }
}

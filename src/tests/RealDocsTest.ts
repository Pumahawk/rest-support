import { Document } from '../documents/Document';
import { Context } from '../support';


interface IDocumentData {
    id: string,
    name: string,
    surname: string,
}

class RealDocsTest extends Document<IDocumentData> {

    constructor(data: IDocumentData) {
        super(data);
    }
    public url(context: Context): string {
        return 'path/tp/resources/' + this.data.id;
    }
    public extractor(dto: IDocumentData): IDocumentData {
        return dto;
    }
    public serializer(data: IDocumentData): IDocumentData {
        return data;
    }

}

const document = new RealDocsTest({
    id: '1234',
    name: 'Name real resource',
    surname: 'Surname of this special resouce'
});

document.update();
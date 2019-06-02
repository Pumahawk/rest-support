import { LazyDocument } from "../documents/LazyDocument";

var test = new LazyDocument<any, any>(null, {
    url: () => 'http://localhost:3000/test',
    extractor: (dto) => dto,
    serializer: (data) => data,
});
test.update().then(
    obj => {
        console.log(obj.data)
    }
).catch(
    obj => {
        console.log('error');
        
    }
);
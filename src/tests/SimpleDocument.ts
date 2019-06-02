import { LazyDocument } from "../documents/LazyDocument";

var test = new LazyDocument<any, any>({
    url: () => 'https://httpbin.org/get',
    extractor: (dto) => dto,
    serializer: (data) => data,
});
test.update().then(
    obj => {
        console.log(obj)
    }
).catch(
    obj => {
        console.log('error');
        
    }
);
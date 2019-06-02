export interface Header {
    [name: string]: string
}

export class Context {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET';
}

export class ActionReport {
    message: string = '';
}

export class RestResponse<T> {
    header: Header | undefined;
    data: T;

    constructor(data: T, header?: Header) {
        this.header = header;
        this.data = data;
    }

}
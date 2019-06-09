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

export interface IRequestDispenser<T> {
    get(url: string): Promise<T>;
    put(url: string, obj: any): Promise<T>;
    post(url: string, obj: any): Promise<T>;
    delete(url: string): Promise<T>;
}
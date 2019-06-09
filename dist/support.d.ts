export interface Header {
    [name: string]: string;
}
export declare class Context {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
export declare class ActionReport {
    message: string;
}
export declare class RestResponse<T> {
    header: Header | undefined;
    data: T;
    constructor(data: T, header?: Header);
}
export interface IRequestDispenser<T> {
    get(url: string): Promise<T>;
    put(url: string, obj: any): Promise<T>;
    post(url: string, obj: any): Promise<T>;
    delete(url: string): Promise<T>;
}

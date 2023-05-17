declare module 'named-placeholders' {
    export = createCompiler;
    declare function createCompiler(config?: any): {
        (query: any, paramsObj: any): any[];
        parse: typeof parse;
    };
    declare namespace createCompiler {
        export { toNumbered };
    }
    declare function parse(query: any): any[];
    declare function toNumbered(q: any, params: any): any[];
}

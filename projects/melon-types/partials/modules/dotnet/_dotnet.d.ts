import { _getStaticMethod } from "./_getStaticMethod";
import { _getStaticProperty } from "./_getStaticProperty";
import { _Realm } from "./constructors/_Realm";
import { _loadAssemblyAsync } from "./_loadAssemblyAsync";
import { _createTask } from "./threading/_createTask";
import { _createThread } from "./threading/_createThread";
declare const _dotnet: {
    getStaticMethod: typeof _getStaticMethod;
    getStaticProperty: typeof _getStaticProperty;
    loadAssembly: (path: string) => string;
    removeAssembly: (fullName: string) => void;
    getLoadedAssemblies: () => string[];
    loadAsemblyAsync: typeof _loadAssemblyAsync;
    threading: {
        createTask: typeof _createTask;
        createThread: typeof _createThread;
    };
    types: {
        sbyte: (number: number) => {
            type: string;
            value: number;
        };
        byte: (number: number) => {
            type: string;
            value: number;
        };
        short: (number: number) => {
            type: string;
            value: number;
        };
        ushort: (number: number) => {
            type: string;
            value: number;
        };
        int: (number: number) => {
            type: string;
            value: number;
        };
        uint: (number: number) => {
            type: string;
            value: number;
        };
        long: (number: number) => {
            type: string;
            value: number;
        };
        ulong: (number: number) => {
            type: string;
            value: number;
        };
        float: (number: number) => {
            type: string;
            number: number;
        };
        double: (number: number) => {
            type: string;
            number: number;
        };
        decimal: (number: number) => {
            type: string;
            number: number;
        };
    };
    Realm: typeof _Realm;
};
export { _dotnet };
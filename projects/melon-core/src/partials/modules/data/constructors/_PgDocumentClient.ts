import { DatabaseProviderOptions } from "../../../../types/data/DatabaseProviderOptions";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError";
import { _guards } from "../../guards/_guards";
import { _internalConsts } from "../../internalConsts/_internalConsts";
import { _nextTick } from "../../std/async/_nextTick";
import { _PgClient } from "./_PgClient";

const { isNullOrWhiteSpace } = _guards.string;

class _PgDocumentClient {
    #provider: _PgClient;

    constructor(options: DatabaseProviderOptions) {
        const invalidOptions = 
            (Object.keys(options) as (string | number | boolean)[])
            .filter(option => option[1] === null || isNullOrWhiteSpace(option[1]) || option[1] === 0)
            .map(option => option[0]);
        
        if(invalidOptions.length > 0) {
            throw new InvalidArgumentError(...invalidOptions);
        }

        this.#provider = new _PgClient(options);
    }

    #__checkStringPattern(string: string) {
        return /^[A-Za-z0-9]*$/.test(string);
    }

    /* Dictionaries: Alias to tables, in this context are collections to
    /  englobe "Documents" following a coherent design to quick data 
    /  storage environments and cases. */

    async createDictionaryAsync(name: string) {
        if(!this.#__checkStringPattern(name)) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const script = `
            CREATE TABLE ${name} (
                name varchar(255) PRIMARY KEY,
                document JSONB
            );
        `;

        await _nextTick();
        this.#provider.executeNonQuery(script);
    }

    //Documents

    async addDocumentAsync<TDocument>(dictionary: string, name: string, document: TDocument) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const documentString = JSON.stringify(document);

        const script = `
            INSERT INTO ${dictionary} (name, document) 
            VALUES ('${name}', '${documentString}')
        `;

        await _nextTick();
        this.#provider.executeNonQuery(script);
    }

    async updateDocumentAsync<TDocument>(dictionary: string, name: string, document: TDocument) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const documentString = JSON.stringify(document);

        const script = `
            UPDATE ${dictionary} SET document = '${documentString}'
            WHERE name = '${name}'
        `;

        await _nextTick();
        this.#provider.executeNonQuery(script);
    }

    async getDocumentAsync<TDocument>(dictionary: string, name: string) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const script = `
            SELECT document FROM ${dictionary} WHERE name = '${name}'
        `;

        await _nextTick();
        return this.#provider.executeQuery<TDocument>(script)[0].document;
    }

    async deleteDocumentAsync(dictionary: string, name: string) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const script = `
            DELETE FROM ${dictionary} WHERE name = '${name}'
        `;

        await _nextTick();
        this.#provider.executeNonQuery(script);
    }
}

export { _PgDocumentClient }
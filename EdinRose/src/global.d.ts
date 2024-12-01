import "jest-fetch-mock";

declare global {
    declare const fetchMock: typeof fetch;

}

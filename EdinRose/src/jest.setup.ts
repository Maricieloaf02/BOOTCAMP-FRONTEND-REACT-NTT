import "@testing-library/jest-dom";
import { TextEncoder } from "util";
import fetchMock from "jest-fetch-mock";

global.TextEncoder = TextEncoder;
/* eslint-disable @typescript-eslint/no-unused-vars */
global.TextDecoder = global.TextDecoder || class {
    decode(_input?: BufferSource, _options?: TextDecodeOptions): string {
      throw new Error("TextDecoder is not implemented.");
    }
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */
  

// Habilitar fetchMock
fetchMock.enableMocks();

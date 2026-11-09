import {
  createFakeFetch,
  fakeTokenProvider,
  TEST_ORG_URL,
  type FakeFetch,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { DEMO_ENVIRONMENT_URL } from "../../src/config";
import { createDemoState, createFakeDataverse } from "../../src/demo/fakeDataverse";
import { createSdk, type Sdk } from "../../src/sdk/createSdk";
import type { Exchange } from "../../src/sdk/inspector";

export interface Harness {
  sdk: Sdk;
  exchanges: Exchange[];
}

function recording(): { exchanges: Exchange[]; onExchange: (e: Exchange) => void } {
  const exchanges: Exchange[] = [];
  return {
    exchanges,
    onExchange: (e) => {
      const i = exchanges.findIndex((x) => x.id === e.id);
      if (i < 0) exchanges.push(e);
      else exchanges[i] = e;
    },
  };
}

/** An `Sdk` as a scenario gets it, over the SDK's recording fake fetch. */
export function withFakeFetch(): Harness & { fake: FakeFetch } {
  const fake = createFakeFetch();
  const { exchanges, onExchange } = recording();
  const sdk = createSdk(
    {
      environmentUrl: TEST_ORG_URL,
      tokenProvider: fakeTokenProvider(),
      fetchProvider: fake.fetchProvider,
    },
    onExchange
  );
  return { sdk, exchanges, fake };
}

/** An `Sdk` over demo mode's in-memory environment, without its simulated latency. */
export function withDemo(): Harness {
  const { exchanges, onExchange } = recording();
  const sdk = createSdk(
    {
      environmentUrl: DEMO_ENVIRONMENT_URL,
      tokenProvider: fakeTokenProvider(),
      fetchProvider: createFakeDataverse(createDemoState(), [0, 0]),
    },
    onExchange
  );
  return { sdk, exchanges };
}

export const signal = () => new AbortController().signal;

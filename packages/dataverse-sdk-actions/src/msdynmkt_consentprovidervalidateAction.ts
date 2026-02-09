import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdynmkt_consentprovidervalidate action
 */
export interface msdynmkt_consentprovidervalidateResponse {
  message: string;
  issuccess: boolean;
}

/**
 * msdynmkt_consentprovidervalidate action
 *
 * Unbound action
 */
export class msdynmkt_consentprovidervalidateAction implements Executable<msdynmkt_consentprovidervalidateResponse> {
  constructor(public readonly consentprovider: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentprovidervalidate`;

    const body: Record<string, unknown> = {
      consentprovider: this.consentprovider,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_consentprovidervalidateResponse> {
    const data = await response.json();
    return data as msdynmkt_consentprovidervalidateResponse;
  }
}

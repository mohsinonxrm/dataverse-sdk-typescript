import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdynmkt_consentprovidervalidate request message
 *
 * Web API Action: msdynmkt_consentprovidervalidate
 */
export class msdynmkt_consentprovidervalidateRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_consentprovidervalidateResponse>
{
  constructor(public consentprovider: EntityReference) {
    super("msdynmkt_consentprovidervalidate");
  }

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
    return msdynmkt_consentprovidervalidateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      consentprovider: this.consentprovider,
    };
  }
}

/**
 * msdynmkt_consentprovidervalidate response message
 */
export class msdynmkt_consentprovidervalidateResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_consentprovidervalidateResponse) {
    super("msdynmkt_consentprovidervalidate");
  }

  static fromResponse(data: unknown): msdynmkt_consentprovidervalidateResponse {
    return new msdynmkt_consentprovidervalidateResponse((data as any).value);
  }
}

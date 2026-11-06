import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdynmkt_consentprovidervalidateResponse as msdynmkt_consentprovidervalidateResponseData } from "./types/index.js";

/**
 * msdynmkt_consentprovidervalidate request message
 *
 * Web API Action: msdynmkt_consentprovidervalidate
 */
export class msdynmkt_consentprovidervalidateRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_consentprovidervalidateResponse>
{
  constructor(public consentprovider: EntityReference | AnyEntityPayload) {
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_consentprovidervalidateResponse> {
    const data = await response.json();
    return msdynmkt_consentprovidervalidateResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_consentprovidervalidate response message
 */
export class msdynmkt_consentprovidervalidateResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_consentprovidervalidateResponseData) {
    super("msdynmkt_consentprovidervalidate");
  }

  static fromResponse(data: unknown): msdynmkt_consentprovidervalidateResponse {
    return new msdynmkt_consentprovidervalidateResponse(
      responseObject<msdynmkt_consentprovidervalidateResponseData>(data)
    );
  }
}

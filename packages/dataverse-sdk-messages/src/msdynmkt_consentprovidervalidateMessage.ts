import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdynmkt_consentprovidervalidateResponse as msdynmkt_consentprovidervalidateResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_consentprovidervalidate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_consentprovidervalidateRequestParameters {
  consentprovider: EntityReference | AnyEntityPayload;
}

/**
 * msdynmkt_consentprovidervalidate request message
 *
 * Web API Action: msdynmkt_consentprovidervalidate
 */
export class msdynmkt_consentprovidervalidateRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_consentprovidervalidateResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_consentprovidervalidateRequestParameters>;

  constructor(parameters: msdynmkt_consentprovidervalidateRequestParameters) {
    super("msdynmkt_consentprovidervalidate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentprovidervalidate`;

    const body = requestBody({
      consentprovider: this.Parameters.consentprovider,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_consentprovidervalidateResponse.fromResponse({});
    return msdynmkt_consentprovidervalidateResponse.fromResponse(await response.json());
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

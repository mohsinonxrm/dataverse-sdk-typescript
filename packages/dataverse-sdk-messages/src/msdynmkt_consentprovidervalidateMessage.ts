import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdynmkt_consentprovidervalidateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_consentprovidervalidate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_consentprovidervalidateResult {
  "@odata.context"?: string;
  issuccess: boolean;
  message: string;
}

/**
 * msdynmkt_consentprovidervalidate response message
 *
 * `result` is the value the msdynmkt_consentprovidervalidate action returns (see {@link msdynmkt_consentprovidervalidateResult}).
 */
export class msdynmkt_consentprovidervalidateResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_consentprovidervalidateResult) {
    super("msdynmkt_consentprovidervalidate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_consentprovidervalidateResponse {
    return new msdynmkt_consentprovidervalidateResponse(
      data as msdynmkt_consentprovidervalidateResult
    );
  }
}

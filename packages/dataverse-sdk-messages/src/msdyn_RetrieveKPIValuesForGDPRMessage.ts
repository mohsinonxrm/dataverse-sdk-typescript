import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_RetrieveKPIValuesForGDPR message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKPIValuesForGDPRRequestParameters {
  CRMRecord: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_RetrieveKPIValuesForGDPR request message
 *
 * Web API Action: msdyn_RetrieveKPIValuesForGDPR
 */
export class msdyn_RetrieveKPIValuesForGDPRRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKPIValuesForGDPRResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKPIValuesForGDPRRequestParameters>;

  constructor(parameters: msdyn_RetrieveKPIValuesForGDPRRequestParameters) {
    super("msdyn_RetrieveKPIValuesForGDPR", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKPIValuesForGDPR`;

    const body = requestBody({
      CRMRecord: this.Parameters.CRMRecord,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKPIValuesForGDPRResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveKPIValuesForGDPRResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveKPIValuesForGDPR action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKPIValuesForGDPRResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_RetrieveKPIValuesForGDPR response message
 *
 * `result` is the value the msdyn_RetrieveKPIValuesForGDPR action returns (see {@link msdyn_RetrieveKPIValuesForGDPRResult}).
 */
export class msdyn_RetrieveKPIValuesForGDPRResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKPIValuesForGDPRResult) {
    super("msdyn_RetrieveKPIValuesForGDPR");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveKPIValuesForGDPRResponse {
    return new msdyn_RetrieveKPIValuesForGDPRResponse(data as msdyn_RetrieveKPIValuesForGDPRResult);
  }
}

import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveKPIValuesForGDPRResponse as msdyn_RetrieveKPIValuesForGDPRResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveKPIValuesForGDPRResponse.fromResponse({});
    return msdyn_RetrieveKPIValuesForGDPRResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveKPIValuesForGDPR response message
 */
export class msdyn_RetrieveKPIValuesForGDPRResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKPIValuesForGDPRResponseData) {
    super("msdyn_RetrieveKPIValuesForGDPR");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKPIValuesForGDPRResponse {
    return new msdyn_RetrieveKPIValuesForGDPRResponse(
      responseObject<msdyn_RetrieveKPIValuesForGDPRResponseData>(data)
    );
  }
}

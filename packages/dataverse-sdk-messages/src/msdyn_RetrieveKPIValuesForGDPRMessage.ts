import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_RetrieveKPIValuesForGDPR request message
 *
 * Web API Action: msdyn_RetrieveKPIValuesForGDPR
 */
export class msdyn_RetrieveKPIValuesForGDPRRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKPIValuesForGDPRResponse>
{
  constructor(public cRMRecord: EntityReference) {
    super("msdyn_RetrieveKPIValuesForGDPR");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKPIValuesForGDPR`;

    const body: Record<string, unknown> = {
      CRMRecord: this.cRMRecord,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKPIValuesForGDPRResponse> {
    const data = await response.json();
    return msdyn_RetrieveKPIValuesForGDPRResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CRMRecord: this.cRMRecord,
    };
  }
}

/**
 * msdyn_RetrieveKPIValuesForGDPR response message
 */
export class msdyn_RetrieveKPIValuesForGDPRResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKPIValuesForGDPRResponse) {
    super("msdyn_RetrieveKPIValuesForGDPR");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKPIValuesForGDPRResponse {
    return new msdyn_RetrieveKPIValuesForGDPRResponse((data as any).value);
  }
}

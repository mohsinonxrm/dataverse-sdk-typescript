import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveTypeValuesFromDCIResponse as msdyn_RetrieveTypeValuesFromDCIResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveTypeValuesFromDCI request message
 *
 * Web API Action: msdyn_RetrieveTypeValuesFromDCI
 */
export class msdyn_RetrieveTypeValuesFromDCIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveTypeValuesFromDCIResponse>
{
  constructor(
    public crmRecord: EntityReference | AnyEntityPayload,
    public resourceType: number,
    public resourceTypeName: string,
    public startDate?: string,
    public endDate?: string
  ) {
    super("msdyn_RetrieveTypeValuesFromDCI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveTypeValuesFromDCI`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
      ResourceType: this.resourceType,
      ResourceTypeName: this.resourceTypeName,
      StartDate: this.startDate,
      EndDate: this.endDate,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveTypeValuesFromDCIResponse> {
    const data = await response.json();
    return msdyn_RetrieveTypeValuesFromDCIResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveTypeValuesFromDCI response message
 */
export class msdyn_RetrieveTypeValuesFromDCIResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveTypeValuesFromDCIResponseData) {
    super("msdyn_RetrieveTypeValuesFromDCI");
  }

  static fromResponse(data: unknown): msdyn_RetrieveTypeValuesFromDCIResponse {
    return new msdyn_RetrieveTypeValuesFromDCIResponse(
      responseObject<msdyn_RetrieveTypeValuesFromDCIResponseData>(data)
    );
  }
}

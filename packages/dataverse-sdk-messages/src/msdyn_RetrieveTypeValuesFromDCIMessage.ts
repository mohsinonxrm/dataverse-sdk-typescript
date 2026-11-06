import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveTypeValuesFromDCIResponse as msdyn_RetrieveTypeValuesFromDCIResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveTypeValuesFromDCI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveTypeValuesFromDCIRequestParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  ResourceType: number;
  ResourceTypeName: string;
  StartDate?: string;
  EndDate?: string;
}

/**
 * msdyn_RetrieveTypeValuesFromDCI request message
 *
 * Web API Action: msdyn_RetrieveTypeValuesFromDCI
 */
export class msdyn_RetrieveTypeValuesFromDCIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveTypeValuesFromDCIResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveTypeValuesFromDCIRequestParameters>;

  constructor(parameters: msdyn_RetrieveTypeValuesFromDCIRequestParameters) {
    super("msdyn_RetrieveTypeValuesFromDCI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveTypeValuesFromDCI`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
      ResourceType: this.Parameters.ResourceType,
      ResourceTypeName: this.Parameters.ResourceTypeName,
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveTypeValuesFromDCIResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveTypeValuesFromDCIResponse.fromResponse({});
    return msdyn_RetrieveTypeValuesFromDCIResponse.fromResponse(await response.json());
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

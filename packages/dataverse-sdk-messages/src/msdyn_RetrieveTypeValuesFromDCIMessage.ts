import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveTypeValuesFromDCIResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveTypeValuesFromDCI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveTypeValuesFromDCIResult {
  "@odata.context"?: string;
  ResponseValues: string;
}

/**
 * msdyn_RetrieveTypeValuesFromDCI response message
 *
 * `result` is the value the msdyn_RetrieveTypeValuesFromDCI action returns (see {@link msdyn_RetrieveTypeValuesFromDCIResult}).
 */
export class msdyn_RetrieveTypeValuesFromDCIResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveTypeValuesFromDCIResult) {
    super("msdyn_RetrieveTypeValuesFromDCI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveTypeValuesFromDCIResponse {
    return new msdyn_RetrieveTypeValuesFromDCIResponse(
      data as msdyn_RetrieveTypeValuesFromDCIResult
    );
  }
}

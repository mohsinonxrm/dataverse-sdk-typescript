import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_McMcbyValues message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_McMcbyValuesRequestParameters {
  CrmRecord?: EntityReference | AnyEntityPayload;
  KPIType?: string;
}

/**
 * msdyn_McMcbyValues request message
 *
 * Web API Action: msdyn_McMcbyValues
 */
export class msdyn_McMcbyValuesRequest
  extends OrganizationRequest
  implements Executable<msdyn_McMcbyValuesResponse>
{
  declare readonly Parameters: Readonly<msdyn_McMcbyValuesRequestParameters>;

  constructor(parameters: msdyn_McMcbyValuesRequestParameters = {}) {
    super("msdyn_McMcbyValues", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_McMcbyValues`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
      KPIType: this.Parameters.KPIType,
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

  async parseResponse(response: Response): Promise<msdyn_McMcbyValuesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_McMcbyValuesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_McMcbyValues action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_McMcbyValuesResult {
  "@odata.context"?: string;
  LastModifiedOn: string;
}

/**
 * msdyn_McMcbyValues response message
 *
 * `result` is the value the msdyn_McMcbyValues action returns (see {@link msdyn_McMcbyValuesResult}).
 */
export class msdyn_McMcbyValuesResponse extends OrganizationResponse {
  constructor(public result: msdyn_McMcbyValuesResult) {
    super("msdyn_McMcbyValues");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_McMcbyValuesResponse {
    return new msdyn_McMcbyValuesResponse(data as msdyn_McMcbyValuesResult);
  }
}

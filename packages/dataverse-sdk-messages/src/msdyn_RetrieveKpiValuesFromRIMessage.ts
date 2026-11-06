import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_RetrieveKpiValuesFromRI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKpiValuesFromRIRequestParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  KpiType: string;
}

/**
 * msdyn_RetrieveKpiValuesFromRI request message
 *
 * Web API Action: msdyn_RetrieveKpiValuesFromRI
 */
export class msdyn_RetrieveKpiValuesFromRIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKpiValuesFromRIResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKpiValuesFromRIRequestParameters>;

  constructor(parameters: msdyn_RetrieveKpiValuesFromRIRequestParameters) {
    super("msdyn_RetrieveKpiValuesFromRI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiValuesFromRI`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
      KpiType: this.Parameters.KpiType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiValuesFromRIResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveKpiValuesFromRIResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveKpiValuesFromRI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKpiValuesFromRIResult {
  "@odata.context"?: string;
  KpiValues: string;
}

/**
 * msdyn_RetrieveKpiValuesFromRI response message
 *
 * `result` is the value the msdyn_RetrieveKpiValuesFromRI action returns (see {@link msdyn_RetrieveKpiValuesFromRIResult}).
 */
export class msdyn_RetrieveKpiValuesFromRIResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKpiValuesFromRIResult) {
    super("msdyn_RetrieveKpiValuesFromRI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveKpiValuesFromRIResponse {
    return new msdyn_RetrieveKpiValuesFromRIResponse(data as msdyn_RetrieveKpiValuesFromRIResult);
  }
}

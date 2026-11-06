import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_FetchKPIValues message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchKPIValuesRequestParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  KPINames: string;
  KPIType?: string;
}

/**
 * msdyn_FetchKPIValues request message
 *
 * Web API Action: msdyn_FetchKPIValues
 */
export class msdyn_FetchKPIValuesRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchKPIValuesResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchKPIValuesRequestParameters>;

  constructor(parameters: msdyn_FetchKPIValuesRequestParameters) {
    super("msdyn_FetchKPIValues", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchKPIValues`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
      KPINames: this.Parameters.KPINames,
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

  async parseResponse(response: Response): Promise<msdyn_FetchKPIValuesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FetchKPIValuesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FetchKPIValues action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchKPIValuesResult {
  "@odata.context"?: string;
  ErrorList: string;
  KPIValues: string;
  LastModifiedOn: string;
}

/**
 * msdyn_FetchKPIValues response message
 *
 * `result` is the value the msdyn_FetchKPIValues action returns (see {@link msdyn_FetchKPIValuesResult}).
 */
export class msdyn_FetchKPIValuesResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchKPIValuesResult) {
    super("msdyn_FetchKPIValues");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FetchKPIValuesResponse {
    return new msdyn_FetchKPIValuesResponse(data as msdyn_FetchKPIValuesResult);
  }
}

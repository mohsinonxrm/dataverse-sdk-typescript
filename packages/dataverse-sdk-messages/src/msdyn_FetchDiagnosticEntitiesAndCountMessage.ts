import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_FetchDiagnosticEntitiesAndCount message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchDiagnosticEntitiesAndCountRequestParameters {
  msdyn_Filter: string;
  msdyn_RunId: string;
}

/**
 * msdyn_FetchDiagnosticEntitiesAndCount request message
 *
 * Web API Action: msdyn_FetchDiagnosticEntitiesAndCount
 */
export class msdyn_FetchDiagnosticEntitiesAndCountRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchDiagnosticEntitiesAndCountResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchDiagnosticEntitiesAndCountRequestParameters>;

  constructor(parameters: msdyn_FetchDiagnosticEntitiesAndCountRequestParameters) {
    super("msdyn_FetchDiagnosticEntitiesAndCount", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchDiagnosticEntitiesAndCount`;

    const body = requestBody({
      msdyn_Filter: this.Parameters.msdyn_Filter,
      msdyn_RunId: this.Parameters.msdyn_RunId,
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

  async parseResponse(response: Response): Promise<msdyn_FetchDiagnosticEntitiesAndCountResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FetchDiagnosticEntitiesAndCountResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FetchDiagnosticEntitiesAndCount action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchDiagnosticEntitiesAndCountResult {
  "@odata.context"?: string;
  msdyn_Count: number;
}

/**
 * msdyn_FetchDiagnosticEntitiesAndCount response message
 *
 * `result` is the value the msdyn_FetchDiagnosticEntitiesAndCount action returns (see {@link msdyn_FetchDiagnosticEntitiesAndCountResult}).
 */
export class msdyn_FetchDiagnosticEntitiesAndCountResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchDiagnosticEntitiesAndCountResult) {
    super("msdyn_FetchDiagnosticEntitiesAndCount");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FetchDiagnosticEntitiesAndCountResponse {
    return new msdyn_FetchDiagnosticEntitiesAndCountResponse(
      data as msdyn_FetchDiagnosticEntitiesAndCountResult
    );
  }
}

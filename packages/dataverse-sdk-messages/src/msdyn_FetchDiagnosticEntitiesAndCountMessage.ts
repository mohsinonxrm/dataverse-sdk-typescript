import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FetchDiagnosticEntitiesAndCountResponse as msdyn_FetchDiagnosticEntitiesAndCountResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FetchDiagnosticEntitiesAndCount message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchDiagnosticEntitiesAndCountRequestParameters {
  msdyn_RunId: string;
  msdyn_Filter: string;
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
      msdyn_RunId: this.Parameters.msdyn_RunId,
      msdyn_Filter: this.Parameters.msdyn_Filter,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FetchDiagnosticEntitiesAndCountResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_FetchDiagnosticEntitiesAndCount response message
 */
export class msdyn_FetchDiagnosticEntitiesAndCountResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchDiagnosticEntitiesAndCountResponseData) {
    super("msdyn_FetchDiagnosticEntitiesAndCount");
  }

  static fromResponse(data: unknown): msdyn_FetchDiagnosticEntitiesAndCountResponse {
    return new msdyn_FetchDiagnosticEntitiesAndCountResponse(
      responseObject<msdyn_FetchDiagnosticEntitiesAndCountResponseData>(data)
    );
  }
}

import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemform } from "./types/index.js";

/**
 * Parameters of the CopySystemForm message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CopySystemFormRequestParameters {
  Target?: EntityReference | EntityPayload<systemform>;
}

/**
 * CopySystemForm request message
 *
 * Web API Action: CopySystemForm
 *
 * The first argument is the id of the systemform record to call it on.
 */
export class CopySystemFormRequest
  extends OrganizationRequest
  implements Executable<CopySystemFormResponse>
{
  declare readonly Parameters: Readonly<CopySystemFormRequestParameters>;

  constructor(
    public systemformId: string,
    parameters: CopySystemFormRequestParameters = {}
  ) {
    super("CopySystemForm", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemforms(${this.systemformId})/Microsoft.Dynamics.CRM.CopySystemForm`;

    const body = requestBody({
      Target: this.Parameters.Target,
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

  async parseResponse(response: Response): Promise<CopySystemFormResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CopySystemFormResponse.fromResponse({});
    return CopySystemFormResponse.fromResponse(await response.json());
  }
}

/**
 * CopySystemForm response message
 */
export class CopySystemFormResponse extends OrganizationResponse {
  constructor(public result: systemform) {
    super("CopySystemForm");
  }

  static fromResponse(data: unknown): CopySystemFormResponse {
    return new CopySystemFormResponse(responseObject<systemform>(data));
  }
}

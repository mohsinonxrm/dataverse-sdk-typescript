import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { systemform } from "./types/index.js";

/**
 * CopySystemForm request message
 *
 * Web API Action: CopySystemForm
 */
export class CopySystemFormRequest
  extends OrganizationRequest
  implements Executable<CopySystemFormResponse>
{
  constructor(
    public systemformId: string,
    public target: systemform
  ) {
    super("CopySystemForm");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemforms(${this.systemformId})/Microsoft.Dynamics.CRM.CopySystemForm`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<CopySystemFormResponse> {
    const data = await response.json();
    return CopySystemFormResponse.fromResponse(data);
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

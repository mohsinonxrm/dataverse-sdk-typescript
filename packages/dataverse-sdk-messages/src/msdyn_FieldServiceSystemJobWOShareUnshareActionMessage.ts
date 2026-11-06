import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FieldServiceSystemJobWOShareUnshareActionResponse as msdyn_FieldServiceSystemJobWOShareUnshareActionResponseData } from "./types/index.js";

/**
 * msdyn_FieldServiceSystemJobWOShareUnshareAction request message
 *
 * Web API Action: msdyn_FieldServiceSystemJobWOShareUnshareAction
 */
export class msdyn_FieldServiceSystemJobWOShareUnshareActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceSystemJobWOShareUnshareActionResponse>
{
  constructor(
    public msdyn_fieldservicesystemjobId: string,
    public inputParameter: string,
    public type: number
  ) {
    super("msdyn_FieldServiceSystemJobWOShareUnshareAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fieldservicesystemjobs(${this.msdyn_fieldservicesystemjobId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceSystemJobWOShareUnshareAction`;

    const body: Record<string, unknown> = {
      InputParameter: this.inputParameter,
      Type: this.type,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_FieldServiceSystemJobWOShareUnshareActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceSystemJobWOShareUnshareActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_FieldServiceSystemJobWOShareUnshareAction response message
 */
export class msdyn_FieldServiceSystemJobWOShareUnshareActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceSystemJobWOShareUnshareActionResponseData) {
    super("msdyn_FieldServiceSystemJobWOShareUnshareAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceSystemJobWOShareUnshareActionResponse {
    return new msdyn_FieldServiceSystemJobWOShareUnshareActionResponse(
      responseObject<msdyn_FieldServiceSystemJobWOShareUnshareActionResponseData>(data)
    );
  }
}

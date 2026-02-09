import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
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

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_fieldservicesystemjobId,
      InputParameter: this.inputParameter,
      Type: this.type,
    };
  }
}

/**
 * msdyn_FieldServiceSystemJobWOShareUnshareAction response message
 */
export class msdyn_FieldServiceSystemJobWOShareUnshareActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceSystemJobWOShareUnshareActionResponse) {
    super("msdyn_FieldServiceSystemJobWOShareUnshareAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceSystemJobWOShareUnshareActionResponse {
    return new msdyn_FieldServiceSystemJobWOShareUnshareActionResponse((data as any).value);
  }
}

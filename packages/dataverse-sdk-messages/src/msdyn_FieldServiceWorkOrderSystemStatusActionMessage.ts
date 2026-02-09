import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceWorkOrderSystemStatusAction request message
 *
 * Web API Action: msdyn_FieldServiceWorkOrderSystemStatusAction
 */
export class msdyn_FieldServiceWorkOrderSystemStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceWorkOrderSystemStatusActionResponse>
{
  constructor(
    public msdyn_workorderId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceWorkOrderSystemStatusAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorders(${this.msdyn_workorderId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderSystemStatusAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
      InputParameter: this.inputParameter,
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
  ): Promise<msdyn_FieldServiceWorkOrderSystemStatusActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceWorkOrderSystemStatusActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_workorderId,
      Type: this.type,
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_FieldServiceWorkOrderSystemStatusAction response message
 */
export class msdyn_FieldServiceWorkOrderSystemStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceWorkOrderSystemStatusActionResponse) {
    super("msdyn_FieldServiceWorkOrderSystemStatusAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceWorkOrderSystemStatusActionResponse {
    return new msdyn_FieldServiceWorkOrderSystemStatusActionResponse((data as any).value);
  }
}

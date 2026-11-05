import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceSystemAction request message
 *
 * Web API Action: msdyn_FieldServiceSystemAction
 */
export class msdyn_FieldServiceSystemActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceSystemActionResponse>
{
  constructor(
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceSystemAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceSystemAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
      InputParameter: this.inputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_FieldServiceSystemActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceSystemActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Type: this.type,
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_FieldServiceSystemAction response message
 */
export class msdyn_FieldServiceSystemActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceSystemActionResponse) {
    super("msdyn_FieldServiceSystemAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceSystemActionResponse {
    return new msdyn_FieldServiceSystemActionResponse((data as any).value);
  }
}

import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_JsonGetBoolean request message
 *
 * Web API Action: msdyn_JsonGetBoolean
 */
export class msdyn_JsonGetBooleanRequest
  extends OrganizationRequest
  implements Executable<msdyn_JsonGetBooleanResponse>
{
  constructor(
    public json: string,
    public propertyPath: string,
    public defaultReturnValue: boolean
  ) {
    super("msdyn_JsonGetBoolean");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetBoolean`;

    const body: Record<string, unknown> = {
      Json: this.json,
      PropertyPath: this.propertyPath,
      DefaultReturnValue: this.defaultReturnValue,
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

  async parseResponse(response: Response): Promise<msdyn_JsonGetBooleanResponse> {
    const data = await response.json();
    return msdyn_JsonGetBooleanResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Json: this.json,
      PropertyPath: this.propertyPath,
      DefaultReturnValue: this.defaultReturnValue,
    };
  }
}

/**
 * msdyn_JsonGetBoolean response message
 */
export class msdyn_JsonGetBooleanResponse extends OrganizationResponse {
  constructor(public result: msdyn_JsonGetBooleanResponse) {
    super("msdyn_JsonGetBoolean");
  }

  static fromResponse(data: unknown): msdyn_JsonGetBooleanResponse {
    return new msdyn_JsonGetBooleanResponse((data as any).value);
  }
}

import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RetrieveEnvironmentVariableValueForCS request message
 *
 * Web API Action: msdyn_RetrieveEnvironmentVariableValueForCS
 */
export class msdyn_RetrieveEnvironmentVariableValueForCSRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveEnvironmentVariableValueForCSResponse>
{
  constructor(public msdyn_EnvironmentVariableName: string) {
    super("msdyn_RetrieveEnvironmentVariableValueForCS");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEnvironmentVariableValueForCS`;

    const body: Record<string, unknown> = {
      msdyn_EnvironmentVariableName: this.msdyn_EnvironmentVariableName,
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
  ): Promise<msdyn_RetrieveEnvironmentVariableValueForCSResponse> {
    const data = await response.json();
    return msdyn_RetrieveEnvironmentVariableValueForCSResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_EnvironmentVariableName: this.msdyn_EnvironmentVariableName,
    };
  }
}

/**
 * msdyn_RetrieveEnvironmentVariableValueForCS response message
 */
export class msdyn_RetrieveEnvironmentVariableValueForCSResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveEnvironmentVariableValueForCSResponse) {
    super("msdyn_RetrieveEnvironmentVariableValueForCS");
  }

  static fromResponse(data: unknown): msdyn_RetrieveEnvironmentVariableValueForCSResponse {
    return new msdyn_RetrieveEnvironmentVariableValueForCSResponse((data as any).value);
  }
}

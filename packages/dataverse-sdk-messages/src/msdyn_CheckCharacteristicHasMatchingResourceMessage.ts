import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckCharacteristicHasMatchingResource request message
 *
 * Web API Action: msdyn_CheckCharacteristicHasMatchingResource
 */
export class msdyn_CheckCharacteristicHasMatchingResourceRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckCharacteristicHasMatchingResourceResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckCharacteristicHasMatchingResource");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckCharacteristicHasMatchingResource`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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
  ): Promise<msdyn_CheckCharacteristicHasMatchingResourceResponse> {
    const data = await response.json();
    return msdyn_CheckCharacteristicHasMatchingResourceResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckCharacteristicHasMatchingResource response message
 */
export class msdyn_CheckCharacteristicHasMatchingResourceResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckCharacteristicHasMatchingResourceResponse) {
    super("msdyn_CheckCharacteristicHasMatchingResource");
  }

  static fromResponse(data: unknown): msdyn_CheckCharacteristicHasMatchingResourceResponse {
    return new msdyn_CheckCharacteristicHasMatchingResourceResponse((data as any).value);
  }
}

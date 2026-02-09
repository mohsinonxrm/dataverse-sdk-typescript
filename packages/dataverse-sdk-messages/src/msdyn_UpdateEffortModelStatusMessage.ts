import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateEffortModelStatus request message
 *
 * Web API Action: msdyn_UpdateEffortModelStatus
 */
export class msdyn_UpdateEffortModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateEffortModelStatusResponse>
{
  constructor(
    public aiConfigId: string,
    public effortModelId: string
  ) {
    super("msdyn_UpdateEffortModelStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateEffortModelStatus`;

    const body: Record<string, unknown> = {
      AiConfigId: this.aiConfigId,
      EffortModelId: this.effortModelId,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateEffortModelStatusResponse> {
    const data = await response.json();
    return msdyn_UpdateEffortModelStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AiConfigId: this.aiConfigId,
      EffortModelId: this.effortModelId,
    };
  }
}

/**
 * msdyn_UpdateEffortModelStatus response message
 */
export class msdyn_UpdateEffortModelStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateEffortModelStatusResponse) {
    super("msdyn_UpdateEffortModelStatus");
  }

  static fromResponse(data: unknown): msdyn_UpdateEffortModelStatusResponse {
    return new msdyn_UpdateEffortModelStatusResponse((data as any).value);
  }
}

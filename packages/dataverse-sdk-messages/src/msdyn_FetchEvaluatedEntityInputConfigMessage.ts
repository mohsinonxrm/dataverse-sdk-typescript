import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FetchEvaluatedEntityInputConfig request message
 *
 * Web API Action: msdyn_FetchEvaluatedEntityInputConfig
 */
export class msdyn_FetchEvaluatedEntityInputConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchEvaluatedEntityInputConfigResponse>
{
  constructor(
    public regardingEntityId: string,
    public regardingEntityLogicalName: string
  ) {
    super("msdyn_FetchEvaluatedEntityInputConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchEvaluatedEntityInputConfig`;

    const body: Record<string, unknown> = {
      regardingEntityId: this.regardingEntityId,
      regardingEntityLogicalName: this.regardingEntityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_FetchEvaluatedEntityInputConfigResponse> {
    const data = await response.json();
    return msdyn_FetchEvaluatedEntityInputConfigResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      regardingEntityId: this.regardingEntityId,
      regardingEntityLogicalName: this.regardingEntityLogicalName,
    };
  }
}

/**
 * msdyn_FetchEvaluatedEntityInputConfig response message
 */
export class msdyn_FetchEvaluatedEntityInputConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchEvaluatedEntityInputConfigResponse) {
    super("msdyn_FetchEvaluatedEntityInputConfig");
  }

  static fromResponse(data: unknown): msdyn_FetchEvaluatedEntityInputConfigResponse {
    return new msdyn_FetchEvaluatedEntityInputConfigResponse((data as any).value);
  }
}

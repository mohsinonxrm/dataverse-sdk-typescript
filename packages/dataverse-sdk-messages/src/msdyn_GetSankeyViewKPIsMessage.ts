import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSankeyViewKPIs request message
 *
 * Web API Action: msdyn_GetSankeyViewKPIs
 */
export class msdyn_GetSankeyViewKPIsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSankeyViewKPIsResponse>
{
  constructor(
    public actionIds: string,
    public sequenceId: string,
    public regardingEntityName: string
  ) {
    super("msdyn_GetSankeyViewKPIs");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyViewKPIs`;

    const body: Record<string, unknown> = {
      ActionIds: this.actionIds,
      SequenceId: this.sequenceId,
      RegardingEntityName: this.regardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetSankeyViewKPIsResponse> {
    const data = await response.json();
    return msdyn_GetSankeyViewKPIsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ActionIds: this.actionIds,
      SequenceId: this.sequenceId,
      RegardingEntityName: this.regardingEntityName,
    };
  }
}

/**
 * msdyn_GetSankeyViewKPIs response message
 */
export class msdyn_GetSankeyViewKPIsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSankeyViewKPIsResponse) {
    super("msdyn_GetSankeyViewKPIs");
  }

  static fromResponse(data: unknown): msdyn_GetSankeyViewKPIsResponse {
    return new msdyn_GetSankeyViewKPIsResponse((data as any).value);
  }
}

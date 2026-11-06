import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrieveEmailNBAResponse as msdyn_RetrieveEmailNBAResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveEmailNBA request message
 *
 * Web API Action: msdyn_RetrieveEmailNBA
 */
export class msdyn_RetrieveEmailNBARequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveEmailNBAResponse>
{
  constructor(
    public msdyn_RegardingEntityIds: string,
    public msdyn_RegardingLogicalName: string
  ) {
    super("msdyn_RetrieveEmailNBA");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEmailNBA`;

    const body: Record<string, unknown> = {
      msdyn_RegardingEntityIds: this.msdyn_RegardingEntityIds,
      msdyn_RegardingLogicalName: this.msdyn_RegardingLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveEmailNBAResponse> {
    const data = await response.json();
    return msdyn_RetrieveEmailNBAResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveEmailNBA response message
 */
export class msdyn_RetrieveEmailNBAResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveEmailNBAResponseData) {
    super("msdyn_RetrieveEmailNBA");
  }

  static fromResponse(data: unknown): msdyn_RetrieveEmailNBAResponse {
    return new msdyn_RetrieveEmailNBAResponse(
      responseObject<msdyn_RetrieveEmailNBAResponseData>(data)
    );
  }
}

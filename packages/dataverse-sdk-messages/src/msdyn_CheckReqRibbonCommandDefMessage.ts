import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckReqRibbonCommandDefResponse as msdyn_CheckReqRibbonCommandDefResponseData } from "./types/index.js";

/**
 * msdyn_CheckReqRibbonCommandDef request message
 *
 * Web API Action: msdyn_CheckReqRibbonCommandDef
 */
export class msdyn_CheckReqRibbonCommandDefRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckReqRibbonCommandDefResponse>
{
  constructor(public commandAndEntityList: string) {
    super("msdyn_CheckReqRibbonCommandDef");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqRibbonCommandDef`;

    const body: Record<string, unknown> = {
      CommandAndEntityList: this.commandAndEntityList,
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

  async parseResponse(response: Response): Promise<msdyn_CheckReqRibbonCommandDefResponse> {
    const data = await response.json();
    return msdyn_CheckReqRibbonCommandDefResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckReqRibbonCommandDef response message
 */
export class msdyn_CheckReqRibbonCommandDefResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckReqRibbonCommandDefResponseData) {
    super("msdyn_CheckReqRibbonCommandDef");
  }

  static fromResponse(data: unknown): msdyn_CheckReqRibbonCommandDefResponse {
    return new msdyn_CheckReqRibbonCommandDefResponse(
      responseObject<msdyn_CheckReqRibbonCommandDefResponseData>(data)
    );
  }
}

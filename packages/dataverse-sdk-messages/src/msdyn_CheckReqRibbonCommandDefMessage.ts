import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckReqRibbonCommandDefResponse as msdyn_CheckReqRibbonCommandDefResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckReqRibbonCommandDef message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckReqRibbonCommandDefRequestParameters {
  CommandAndEntityList?: string;
}

/**
 * msdyn_CheckReqRibbonCommandDef request message
 *
 * Web API Action: msdyn_CheckReqRibbonCommandDef
 */
export class msdyn_CheckReqRibbonCommandDefRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckReqRibbonCommandDefResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckReqRibbonCommandDefRequestParameters>;

  constructor(parameters: msdyn_CheckReqRibbonCommandDefRequestParameters = {}) {
    super("msdyn_CheckReqRibbonCommandDef", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqRibbonCommandDef`;

    const body = requestBody({
      CommandAndEntityList: this.Parameters.CommandAndEntityList,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckReqRibbonCommandDefResponse.fromResponse(text ? JSON.parse(text) : {});
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

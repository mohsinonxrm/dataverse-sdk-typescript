import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AddOrUpdatePlaybookInstructionsResponse as msdyn_AddOrUpdatePlaybookInstructionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AddOrUpdatePlaybookInstructions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AddOrUpdatePlaybookInstructionsRequestParameters {
  msdyn_Instructions: string;
}

/**
 * msdyn_AddOrUpdatePlaybookInstructions request message
 *
 * Web API Action: msdyn_AddOrUpdatePlaybookInstructions
 */
export class msdyn_AddOrUpdatePlaybookInstructionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AddOrUpdatePlaybookInstructionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_AddOrUpdatePlaybookInstructionsRequestParameters>;

  constructor(parameters: msdyn_AddOrUpdatePlaybookInstructionsRequestParameters) {
    super("msdyn_AddOrUpdatePlaybookInstructions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddOrUpdatePlaybookInstructions`;

    const body = requestBody({
      msdyn_Instructions: this.Parameters.msdyn_Instructions,
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

  async parseResponse(response: Response): Promise<msdyn_AddOrUpdatePlaybookInstructionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_AddOrUpdatePlaybookInstructionsResponse.fromResponse({});
    return msdyn_AddOrUpdatePlaybookInstructionsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_AddOrUpdatePlaybookInstructions response message
 */
export class msdyn_AddOrUpdatePlaybookInstructionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AddOrUpdatePlaybookInstructionsResponseData) {
    super("msdyn_AddOrUpdatePlaybookInstructions");
  }

  static fromResponse(data: unknown): msdyn_AddOrUpdatePlaybookInstructionsResponse {
    return new msdyn_AddOrUpdatePlaybookInstructionsResponse(
      responseObject<msdyn_AddOrUpdatePlaybookInstructionsResponseData>(data)
    );
  }
}

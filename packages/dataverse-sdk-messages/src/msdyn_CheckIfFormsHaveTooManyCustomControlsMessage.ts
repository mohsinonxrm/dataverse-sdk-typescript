import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfFormsHaveTooManyCustomControlsResponse as msdyn_CheckIfFormsHaveTooManyCustomControlsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfFormsHaveTooManyCustomControls message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfFormsHaveTooManyCustomControlsRequestParameters {
  SolutionName?: string;
  LogicalNamesOfEntitiesToCheck?: string;
  NotificationRecipientUserIds?: string;
  ControlsAndLimits?: string;
}

/**
 * msdyn_CheckIfFormsHaveTooManyCustomControls request message
 *
 * Web API Action: msdyn_CheckIfFormsHaveTooManyCustomControls
 */
export class msdyn_CheckIfFormsHaveTooManyCustomControlsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfFormsHaveTooManyCustomControlsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfFormsHaveTooManyCustomControlsRequestParameters>;

  constructor(parameters: msdyn_CheckIfFormsHaveTooManyCustomControlsRequestParameters = {}) {
    super("msdyn_CheckIfFormsHaveTooManyCustomControls", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfFormsHaveTooManyCustomControls`;

    const body = requestBody({
      SolutionName: this.Parameters.SolutionName,
      LogicalNamesOfEntitiesToCheck: this.Parameters.LogicalNamesOfEntitiesToCheck,
      NotificationRecipientUserIds: this.Parameters.NotificationRecipientUserIds,
      ControlsAndLimits: this.Parameters.ControlsAndLimits,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfFormsHaveTooManyCustomControlsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfFormsHaveTooManyCustomControlsResponse.fromResponse({});
    return msdyn_CheckIfFormsHaveTooManyCustomControlsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckIfFormsHaveTooManyCustomControls response message
 */
export class msdyn_CheckIfFormsHaveTooManyCustomControlsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfFormsHaveTooManyCustomControlsResponseData) {
    super("msdyn_CheckIfFormsHaveTooManyCustomControls");
  }

  static fromResponse(data: unknown): msdyn_CheckIfFormsHaveTooManyCustomControlsResponse {
    return new msdyn_CheckIfFormsHaveTooManyCustomControlsResponse(
      responseObject<msdyn_CheckIfFormsHaveTooManyCustomControlsResponseData>(data)
    );
  }
}

import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpdateSolutionComponent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateSolutionComponentRequestParameters {
  ComponentId: string;
  ComponentType: number;
  SolutionUniqueName: string;
  IncludedComponentSettingsValues?: string[];
}

/**
 * UpdateSolutionComponent request message
 *
 * Web API Action: UpdateSolutionComponent
 */
export class UpdateSolutionComponentRequest
  extends OrganizationRequest
  implements Executable<UpdateSolutionComponentResponse>
{
  declare readonly Parameters: Readonly<UpdateSolutionComponentRequestParameters>;

  constructor(parameters: UpdateSolutionComponentRequestParameters) {
    super("UpdateSolutionComponent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateSolutionComponent`;

    const body = requestBody({
      ComponentId: this.Parameters.ComponentId,
      ComponentType: this.Parameters.ComponentType,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      IncludedComponentSettingsValues: this.Parameters.IncludedComponentSettingsValues,
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

  parseResponse(_response: Response): Promise<UpdateSolutionComponentResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UpdateSolutionComponentResponse());
  }
}

/**
 * UpdateSolutionComponent response message
 */
export class UpdateSolutionComponentResponse extends OrganizationResponse {
  constructor() {
    super("UpdateSolutionComponent");
  }

  static fromResponse(_data?: unknown): UpdateSolutionComponentResponse {
    return new UpdateSolutionComponentResponse();
  }
}

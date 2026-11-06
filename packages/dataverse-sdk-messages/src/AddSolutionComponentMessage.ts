import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AddSolutionComponentResponse as AddSolutionComponentResponseData } from "./types/index.js";

/**
 * Parameters of the AddSolutionComponent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddSolutionComponentRequestParameters {
  ComponentId: string;
  ComponentType: number;
  SolutionUniqueName: string;
  AddRequiredComponents: boolean;
  DoNotIncludeSubcomponents?: boolean;
  IncludedComponentSettingsValues?: string[];
}

/**
 * AddSolutionComponent request message
 *
 * Web API Action: AddSolutionComponent
 */
export class AddSolutionComponentRequest
  extends OrganizationRequest
  implements Executable<AddSolutionComponentResponse>
{
  declare readonly Parameters: Readonly<AddSolutionComponentRequestParameters>;

  constructor(parameters: AddSolutionComponentRequestParameters) {
    super("AddSolutionComponent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddSolutionComponent`;

    const body = requestBody({
      ComponentId: this.Parameters.ComponentId,
      ComponentType: this.Parameters.ComponentType,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      AddRequiredComponents: this.Parameters.AddRequiredComponents,
      DoNotIncludeSubcomponents: this.Parameters.DoNotIncludeSubcomponents,
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

  async parseResponse(response: Response): Promise<AddSolutionComponentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AddSolutionComponentResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * AddSolutionComponent response message
 */
export class AddSolutionComponentResponse extends OrganizationResponse {
  constructor(public result: AddSolutionComponentResponseData) {
    super("AddSolutionComponent");
  }

  static fromResponse(data: unknown): AddSolutionComponentResponse {
    return new AddSolutionComponentResponse(responseObject<AddSolutionComponentResponseData>(data));
  }
}

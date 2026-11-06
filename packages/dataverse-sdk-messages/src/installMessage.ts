import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { installResponse as installResponseData } from "./types/index.js";

/**
 * Parameters of the install message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface installRequestParameters {
  connectionReferences: string;
  appIds?: string;
  context?: string;
  expand?: string;
}

/**
 * install request message
 *
 * Web API Action: install
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class installRequest extends OrganizationRequest implements Executable<installResponse> {
  declare readonly Parameters: Readonly<installRequestParameters>;

  constructor(
    public workflowId: string,
    parameters: installRequestParameters
  ) {
    super("install", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.install`;

    const body = requestBody({
      connectionReferences: this.Parameters.connectionReferences,
      appIds: this.Parameters.appIds,
      context: this.Parameters.context,
      expand: this.Parameters.expand,
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

  async parseResponse(response: Response): Promise<installResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return installResponse.fromResponse({});
    return installResponse.fromResponse(await response.json());
  }
}

/**
 * install response message
 */
export class installResponse extends OrganizationResponse {
  constructor(public result: installResponseData) {
    super("install");
  }

  static fromResponse(data: unknown): installResponse {
    return new installResponse(responseObject<installResponseData>(data));
  }
}

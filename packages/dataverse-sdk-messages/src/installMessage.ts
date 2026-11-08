import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.install`;

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
    // The body is the complex value, with its @odata.context
    return installResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the install action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface installResult {
  "@odata.context"?: string;
  connectionId: string;
  flowTriggerUri: string;
  stringifiedConnectionObject: string;
}

/**
 * install response message
 *
 * `result` is the value the install action returns (see {@link installResult}).
 */
export class installResponse extends OrganizationResponse {
  constructor(public result: installResult) {
    super("install");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): installResponse {
    return new installResponse(data as installResult);
  }
}

import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpdateAccountCredentials message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateAccountCredentialsRequestParameters {
  groupCredentials: string;
}

/**
 * UpdateAccountCredentials request message
 *
 * Web API Action: UpdateAccountCredentials
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
 */
export class UpdateAccountCredentialsRequest
  extends OrganizationRequest
  implements Executable<UpdateAccountCredentialsResponse>
{
  declare readonly Parameters: Readonly<UpdateAccountCredentialsRequestParameters>;

  constructor(
    public flowmachinegroupId: string,
    parameters: UpdateAccountCredentialsRequestParameters
  ) {
    super("UpdateAccountCredentials", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${odataLiteral.guid(this.flowmachinegroupId)})/Microsoft.Dynamics.CRM.UpdateAccountCredentials`;

    const body = requestBody({
      groupCredentials: this.Parameters.groupCredentials,
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

  parseResponse(_response: Response): Promise<UpdateAccountCredentialsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UpdateAccountCredentialsResponse());
  }
}

/**
 * UpdateAccountCredentials response message
 */
export class UpdateAccountCredentialsResponse extends OrganizationResponse {
  constructor() {
    super("UpdateAccountCredentials");
  }

  static fromResponse(_data?: unknown): UpdateAccountCredentialsResponse {
    return new UpdateAccountCredentialsResponse();
  }
}

import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the AddPrincipalToQueue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddPrincipalToQueueRequestParameters {
  Principal: EntityReference | AnyEntityPayload;
}

/**
 * AddPrincipalToQueue request message
 *
 * Web API Action: AddPrincipalToQueue
 *
 * The first argument is the id of the queue record to call it on.
 */
export class AddPrincipalToQueueRequest
  extends OrganizationRequest
  implements Executable<AddPrincipalToQueueResponse>
{
  declare readonly Parameters: Readonly<AddPrincipalToQueueRequestParameters>;

  constructor(
    public queueId: string,
    parameters: AddPrincipalToQueueRequestParameters
  ) {
    super("AddPrincipalToQueue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queues(${odataLiteral.guid(this.queueId)})/Microsoft.Dynamics.CRM.AddPrincipalToQueue`;

    const body = requestBody({
      Principal: this.Parameters.Principal,
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

  parseResponse(_response: Response): Promise<AddPrincipalToQueueResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new AddPrincipalToQueueResponse());
  }
}

/**
 * AddPrincipalToQueue response message
 */
export class AddPrincipalToQueueResponse extends OrganizationResponse {
  constructor() {
    super("AddPrincipalToQueue");
  }

  static fromResponse(_data?: unknown): AddPrincipalToQueueResponse {
    return new AddPrincipalToQueueResponse();
  }
}

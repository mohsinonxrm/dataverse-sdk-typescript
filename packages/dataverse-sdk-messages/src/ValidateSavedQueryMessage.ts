import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ValidateSavedQuery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateSavedQueryRequestParameters {
  FetchXml: string;
  QueryType: number;
}

/**
 * ValidateSavedQuery request message
 *
 * Web API Action: ValidateSavedQuery
 */
export class ValidateSavedQueryRequest
  extends OrganizationRequest
  implements Executable<ValidateSavedQueryResponse>
{
  declare readonly Parameters: Readonly<ValidateSavedQueryRequestParameters>;

  constructor(parameters: ValidateSavedQueryRequestParameters) {
    super("ValidateSavedQuery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery`;

    const body = requestBody({
      FetchXml: this.Parameters.FetchXml,
      QueryType: this.Parameters.QueryType,
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

  async parseResponse(response: Response): Promise<ValidateSavedQueryResponse> {
    // No return value (204 No Content)
    return new ValidateSavedQueryResponse();
  }
}

/**
 * ValidateSavedQuery response message
 */
export class ValidateSavedQueryResponse extends OrganizationResponse {
  constructor() {
    super("ValidateSavedQuery");
  }

  static fromResponse(_data: unknown): ValidateSavedQueryResponse {
    return new ValidateSavedQueryResponse();
  }
}

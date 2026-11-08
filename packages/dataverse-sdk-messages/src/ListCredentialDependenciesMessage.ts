import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ListCredentialDependencies request message
 *
 * Web API Function: ListCredentialDependencies
 *
 * The first argument is the id of the credential record to call it on.
 */
export class ListCredentialDependenciesRequest
  extends OrganizationRequest
  implements Executable<ListCredentialDependenciesResponse>
{
  constructor(public credentialId: string) {
    super("ListCredentialDependencies");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/credentials(${odataLiteral.guid(this.credentialId)})/Microsoft.Dynamics.CRM.ListCredentialDependencies`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListCredentialDependenciesResponse> {
    // The body is the complex value, with its @odata.context
    return ListCredentialDependenciesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ListCredentialDependencies function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ListCredentialDependenciesResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * ListCredentialDependencies response message
 *
 * `result` is the value the ListCredentialDependencies function returns (see {@link ListCredentialDependenciesResult}).
 */
export class ListCredentialDependenciesResponse extends OrganizationResponse {
  constructor(public result: ListCredentialDependenciesResult) {
    super("ListCredentialDependencies");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ListCredentialDependenciesResponse {
    return new ListCredentialDependenciesResponse(data as ListCredentialDependenciesResult);
  }
}

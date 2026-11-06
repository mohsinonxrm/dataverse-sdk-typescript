import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ListCredentialDependencies function
 */
export interface ListCredentialDependenciesResponse {
  response: string;
}

/**
 * ListCredentialDependencies function
 *
 * Bound function
 * Binding parameter: entity (mscrm.credential)
 *
 * The first argument is the id of the credential record to call it on.
 */
export class ListCredentialDependenciesFunction implements Executable<ListCredentialDependenciesResponse> {
  constructor(public readonly credentialId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/credentials(${this.credentialId})/Microsoft.Dynamics.CRM.ListCredentialDependencies`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListCredentialDependenciesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ListCredentialDependenciesResponse;
  }
}

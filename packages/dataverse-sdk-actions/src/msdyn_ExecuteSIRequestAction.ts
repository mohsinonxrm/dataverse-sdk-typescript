import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExecuteSIRequest action
 */
export interface msdyn_ExecuteSIRequestResponse {
  Response: string;
}

/**
 * msdyn_ExecuteSIRequest action
 *
 * Unbound action
 */
export class msdyn_ExecuteSIRequestAction implements Executable<msdyn_ExecuteSIRequestResponse> {
  constructor(
    public readonly methodName: string,
    public readonly methodParams: string | undefined,
    public readonly httpRequestType: string,
    public readonly orgMigratedToCoreServices?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSIRequest`;

    const body: Record<string, unknown> = {
      MethodName: this.methodName,
      MethodParams: this.methodParams,
      HttpRequestType: this.httpRequestType,
      OrgMigratedToCoreServices: this.orgMigratedToCoreServices,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ExecuteSIRequestResponse> {
    const data = await response.json();
    return data as msdyn_ExecuteSIRequestResponse;
  }
}

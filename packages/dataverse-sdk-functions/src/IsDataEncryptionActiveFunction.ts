import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the IsDataEncryptionActive function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsDataEncryptionActiveResponse {
  "@odata.context"?: string;
  IsActive: boolean;
}

/**
 * IsDataEncryptionActive function
 *
 * Unbound function
 */
export class IsDataEncryptionActiveFunction implements Executable<IsDataEncryptionActiveResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsDataEncryptionActive`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsDataEncryptionActiveResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as IsDataEncryptionActiveResponse;
  }
}

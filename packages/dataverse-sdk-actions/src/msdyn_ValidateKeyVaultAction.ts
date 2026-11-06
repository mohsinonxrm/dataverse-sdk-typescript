import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ValidateKeyVault action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ValidateKeyVaultResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_ValidateKeyVault action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ValidateKeyVaultActionParameters {
  BundleIdentifier?: string;
  StorageTypeForUpload?: string;
  IsAppSigningEnabled?: boolean;
  KeyVaultUri?: string;
  PlatformType?: string;
}

/**
 * msdyn_ValidateKeyVault action
 *
 * Unbound action
 */
export class msdyn_ValidateKeyVaultAction implements Executable<msdyn_ValidateKeyVaultResponse> {
  constructor(public readonly parameters: msdyn_ValidateKeyVaultActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateKeyVault`;

    const body = requestBody({
      BundleIdentifier: this.parameters.BundleIdentifier,
      StorageTypeForUpload: this.parameters.StorageTypeForUpload,
      IsAppSigningEnabled: this.parameters.IsAppSigningEnabled,
      KeyVaultUri: this.parameters.KeyVaultUri,
      PlatformType: this.parameters.PlatformType,
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

  async parseResponse(response: Response): Promise<msdyn_ValidateKeyVaultResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ValidateKeyVaultResponse;
  }
}

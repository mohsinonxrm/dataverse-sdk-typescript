import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ValidateKeyVault action
 */
export interface msdyn_ValidateKeyVaultResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_ValidateKeyVault action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ValidateKeyVaultActionParameters {
  KeyVaultUri?: string;
  PlatformType?: string;
  IsAppSigningEnabled?: boolean;
  BundleIdentifier?: string;
  StorageTypeForUpload?: string;
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
      KeyVaultUri: this.parameters.KeyVaultUri,
      PlatformType: this.parameters.PlatformType,
      IsAppSigningEnabled: this.parameters.IsAppSigningEnabled,
      BundleIdentifier: this.parameters.BundleIdentifier,
      StorageTypeForUpload: this.parameters.StorageTypeForUpload,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ValidateKeyVaultResponse;
    return (await response.json()) as msdyn_ValidateKeyVaultResponse;
  }
}

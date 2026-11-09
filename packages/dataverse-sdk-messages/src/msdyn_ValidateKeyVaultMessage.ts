import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ValidateKeyVault message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ValidateKeyVaultRequestParameters {
  BundleIdentifier?: string;
  StorageTypeForUpload?: string;
  IsAppSigningEnabled?: boolean;
  KeyVaultUri?: string;
  PlatformType?: string;
}

/**
 * msdyn_ValidateKeyVault request message
 *
 * Web API Action: msdyn_ValidateKeyVault
 */
export class msdyn_ValidateKeyVaultRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateKeyVaultResponse>
{
  declare readonly Parameters: Readonly<msdyn_ValidateKeyVaultRequestParameters>;

  constructor(parameters: msdyn_ValidateKeyVaultRequestParameters = {}) {
    super("msdyn_ValidateKeyVault", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateKeyVault`;

    const body = requestBody({
      BundleIdentifier: this.Parameters.BundleIdentifier,
      StorageTypeForUpload: this.Parameters.StorageTypeForUpload,
      IsAppSigningEnabled: this.Parameters.IsAppSigningEnabled,
      KeyVaultUri: this.Parameters.KeyVaultUri,
      PlatformType: this.Parameters.PlatformType,
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
    return msdyn_ValidateKeyVaultResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ValidateKeyVault action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ValidateKeyVaultResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_ValidateKeyVault response message
 *
 * `result` is the value the msdyn_ValidateKeyVault action returns (see {@link msdyn_ValidateKeyVaultResult}).
 */
export class msdyn_ValidateKeyVaultResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateKeyVaultResult) {
    super("msdyn_ValidateKeyVault");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ValidateKeyVaultResponse {
    return new msdyn_ValidateKeyVaultResponse(data as msdyn_ValidateKeyVaultResult);
  }
}

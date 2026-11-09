/**
 * Authentication for the `dataverse-gen` CLI, through `@mohsinonxrm/dataverse-sdk-auth-msal-node`.
 */
import { ConfidentialClientApplication, PublicClientApplication } from "@azure/msal-node";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import type { AccessTokenProvider } from "@mohsinonxrm/dataverse-sdk-core";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import type { DataverseGenAuthConfig, DataverseGenConfig } from "./types.js";

export interface CliAuthOptions {
  /** Where to show the device code sign-in instructions (default: stderr). */
  log?: (message: string) => void;
  /** Environment to read DATAVERSE_* fallbacks from (default: `process.env`). */
  env?: Record<string, string | undefined>;
}

/** The scope for a Dataverse environment: `<origin>/.default`. */
export function dataverseScope(environmentUrl: string): string {
  return `${new URL(environmentUrl).origin}/.default`;
}

function required(value: string | undefined, setting: string, envName: string): string {
  if (value) return value;
  throw DataverseInvalidRequestError.missingParameter(
    `auth.${setting} (or the ${envName} environment variable)`
  );
}

/**
 * Build the token provider for the CLI's `auth` settings: device code with a
 * `PublicClientApplication`, or client credentials with a `ConfidentialClientApplication`.
 *
 * @throws DataverseInvalidRequestError for an unsupported flow or a missing setting.
 */
export function createCliTokenProvider(
  config: Pick<DataverseGenConfig, "environmentUrl"> & { auth: DataverseGenAuthConfig },
  options: CliAuthOptions = {}
): AccessTokenProvider {
  const env = options.env ?? process.env;
  const log =
    options.log ??
    ((message: string) => {
      process.stderr.write(`${message}\n`);
    });
  const auth = config.auth;
  const tenantId = required(
    auth.tenantId ?? env.DATAVERSE_TENANT_ID,
    "tenantId",
    "DATAVERSE_TENANT_ID"
  );
  const clientId = required(
    auth.clientId ?? env.DATAVERSE_CLIENT_ID,
    "clientId",
    "DATAVERSE_CLIENT_ID"
  );
  const authority = auth.authority ?? `https://login.microsoftonline.com/${tenantId}`;
  const scopes = [dataverseScope(config.environmentUrl)];

  switch (auth.flow) {
    case "deviceCode": {
      const pca = new PublicClientApplication({ auth: { clientId, authority } });
      return new MsalNodeTokenProvider(pca, {
        flow: "deviceCode",
        scopes,
        deviceCodeCallback: (response) => {
          log(response.message);
        },
      });
    }
    case "clientCredentials":
    case "clientSecret": {
      const clientSecret = required(
        auth.clientSecret ?? env.DATAVERSE_CLIENT_SECRET,
        "clientSecret",
        "DATAVERSE_CLIENT_SECRET"
      );
      const cca = new ConfidentialClientApplication({
        auth: { clientId, authority, clientSecret },
      });
      return new MsalNodeTokenProvider(cca, { flow: "clientCredentials", scopes });
    }
    default:
      throw DataverseInvalidRequestError.invalidParameter(
        "auth.flow",
        `"${auth.flow}" is not supported; use "deviceCode" or "clientCredentials"`
      );
  }
}

/**
 * The access token `generate` uses: `--token` when given, otherwise one from the configured
 * `auth` flow. The token is acquired once, before generation starts, so device code asks the
 * user to sign in once per run.
 *
 * @throws DataverseInvalidRequestError when neither is set.
 */
export async function acquireCliToken(
  config: DataverseGenConfig,
  token: string | undefined,
  options: CliAuthOptions = {}
): Promise<string> {
  if (token) return token;
  if (!config.auth) {
    throw DataverseInvalidRequestError.missingParameter(
      'credentials: add "auth" to the configuration file or pass --token'
    );
  }
  const provider = createCliTokenProvider({ ...config, auth: config.auth }, options);
  return provider.getToken();
}

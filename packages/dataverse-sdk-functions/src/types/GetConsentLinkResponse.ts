/**
 * GetConsentLinkResponse complex type
 */
export interface GetConsentLinkResponse {
  principalId: string;
  customParameters: string;
  redirectUrl: string;
  firstPartyLoginUri: string;
  consentLink: string;
  tenantId: string;
  principalType: string;
  parameterConsentLinks: string;
}

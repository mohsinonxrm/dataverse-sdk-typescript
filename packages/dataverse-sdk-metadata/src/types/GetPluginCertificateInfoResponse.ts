/**
 * GetPluginCertificateInfoResponse
 */
export interface GetPluginCertificateInfoResponse {
  CertificateHash?: string;
  CertificateSegment?: string;
  CertificateSegmentV2?: string;
  EncodedIssuer?: string;
  EncodedSubject?: string;
  IsSelfSigned?: boolean;
  IssuerDN?: string;
  SubjectDN?: string;
}

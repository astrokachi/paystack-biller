export enum TrustMode {
  ASK_FIRST = 'Ask First',
  TRUST_COMPLETELY = 'Trust Completely',
}

export enum TrustStatus {
  PENDING = 'Pending', // Request sent, waiting for acceptance
  ACTIVE = 'Active',   // Trust relationship is established and active
  PAUSED = 'Paused',   // Temporarily paused by either party
  DECLINED = 'Declined', // Trust request was declined
  REVOKED = 'Revoked', // Trust relationship was revoked by the trustor
}
export function getBeehiivApiKey(): string | undefined {
  return process.env.BEEHIIV_API_KEY;
}

export function getBeehiivPublicationId(): string | undefined {
  return process.env.BEEHIIV_PUBLICATION_ID;
}

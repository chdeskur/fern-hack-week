import { getFaiOrigin } from "./env-variables";

export const postNewQueryToFai = async ({
  queryId,
  domain,
  conversationId,
  text,
  role,
  createdAt,
  timeToFirstToken,
}: {
  queryId: string;
  domain: string;
  conversationId: string;
  text: string;
  role: string;
  createdAt: Date;
  timeToFirstToken: number | null;
}): Promise<void> => {
  try {
    const response = await fetch(`${getFaiOrigin()}/queries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query_id: queryId,
        domain,
        conversation_id: conversationId,
        text,
        role,
        created_at: createdAt.toISOString(),
        time_to_first_token: timeToFirstToken,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to post query (${response.status} ${response.statusText}): ${errorText}`
      );
    }

    const body = await response.json();
    if (!body) {
      throw new Error("Failed to post query (empty response)");
    }
  } catch (error) {
    console.error("Failed to post query to FAI", {
      error,
      queryId,
      domain,
      conversationId,
    });
    throw error;
  }
};

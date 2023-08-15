declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/** The bot's ID. */
			CLIENT_ID: string;
			/** The bot's client secret. */
			CLIENT_SECRET: string;
			/** The URL of the dashboard. */
			APP_URL: string;
			/** The URL of the API. */
			NEXT_PUBLIC_API_ENDPOINT: string;
			/** The URL of the dashboard (if hosted on Vercel). */
			VERCEL_URL: string;
		}
	}
}
import { ActionFunctionArgs, json } from "@remix-run/node";
import { supportedLanguages } from "~/integrations/i18n";
import { i18nCookie } from "~/integrations/i18n/cookie";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const locale = formData.get("locale") || "en"; // Default to 'en' if the locale is not provided

	if (typeof locale !== "string" || !supportedLanguages.includes(locale)) {
		return json({ error: "Unsupported locale" }, { status: 400 });
	}

	return json(
		{ success: true },
		{
			headers: { "Set-Cookie": await i18nCookie.serialize(locale) },
		},
	);
};

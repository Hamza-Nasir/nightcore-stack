export const supportedLanguages = ["en", "fr", "ru"];
export const fallbackLanguage = "en";

export const config = {
	// This is the list of languages your application supports
	supportedLngs: supportedLanguages,
	// This is the language you want to use in case
	// if the user language is not in the supportedLngs
	fallbackLng: fallbackLanguage,
	// The default namespace of i18next is "translation", but you can customize it here
	defaultNS: "common",
	// Disabling suspense is recommended
	react: { useSuspense: false },
};

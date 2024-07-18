import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import clsx from "clsx";
import {
	PreventFlashOnWrongTheme,
	ThemeProvider,
	useTheme,
} from "remix-themes";

import { i18nextServer } from "~/integrations/i18n";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getBrowserEnv } from "./utils/env";
import { themeSessionResolver } from "./utils/theme-resolver";
import { i18nCookie } from "./integrations/i18n/cookie";

export const links: LinksFunction = () => [
	{
		rel: "stylesheet preload prefetch",
		href: tailwindStylesheetUrl,
		as: "style",
	},
];

export const meta: MetaFunction = () => [
	{ title: "Remix Notes" },
	{ name: "description", content: "Remix Notes App" },
];

export const loader: LoaderFunction = async ({ request }) => {
	const locale = await i18nextServer.getLocale(request);
	const { getTheme } = await themeSessionResolver(request);

	return json(
		{
			locale,
			env: getBrowserEnv(),
			theme: getTheme(),
		},
		{
			headers: { "Set-Cookie": await i18nCookie.serialize(locale) },
		},
	);
};

export default function AppWithProviders() {
	const { theme } = useLoaderData<typeof loader>();
	return (
		<ThemeProvider specifiedTheme={theme} themeAction="/set-theme">
			<App />
		</ThemeProvider>
	);
}

function App() {
	const { env, locale, theme: loaderTheme } = useLoaderData<typeof loader>();
	const { i18n } = useTranslation();
	const [theme] = useTheme();

	useChangeLanguage(locale);

	return (
		<html lang={locale} dir={i18n.dir()} className={`h-full ${theme}`}>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
				/>
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(loaderTheme)} />
				<Links />
			</head>
			<body className="h-full">
				<Outlet />
				<ScrollRestoration />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.env = ${JSON.stringify(env)}`,
					}}
				/>
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

import { useLocale } from "remix-i18next";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";
import { supportedLanguages } from "~/integrations/i18n";
import { useFetcher } from "@remix-run/react";

export function LanguageToggle() {
	const locale = useLocale();
	const fetcher = useFetcher();

	const handleLanguageChange = (language: string) => {
		const formData = new FormData();
		formData.append("locale", language);
		fetcher.submit(formData, { action: "/set-locale", method: "post" });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<p>{locale}</p>
					<span className="sr-only">Switch Language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{supportedLanguages.map((language) => (
					<DropdownMenuItem
						onClick={() => handleLanguageChange(language)}
						key={language}
					>
						{language}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

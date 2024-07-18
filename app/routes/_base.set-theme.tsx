import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "~/utils/theme-resolver";

export const action = createThemeAction(themeSessionResolver);

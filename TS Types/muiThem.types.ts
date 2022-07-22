declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: string;
            success: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
            success?: string;
        };
    }
    interface Palette {
        tertiary: {
            main: string;
            dark?: string;
            light?: string;
        };
    }
    interface PaletteOptions {
        tertiary: {
            main: string;
            dark?: string,
            light?: string
        };
    }
}

export {};

export const Constants = {
    TARGET_BOARD: "go60",
    TARGET_KEY_COUNT: 60,
    DEALBREAKER_KEYS: [
        'ST_MACRO_', 'QK_LLCK', 'TOGGLE_LAYER_COLOR', 'MAC_MISSION_CONTROL', 
        'MAC_LOCK', 'MS_JIGGLER_TOGGLE', 'NAVIGATOR_TURBO', 'NAVIGATOR_AIM', 
        'NAVIGATOR_INC_CPI', 'NAVIGATOR_DEC_CPI', 'DRAG_SCROLL', 'AUTOMOUSE_TOGGLE', 
        'SNIPING_MODE', 'TD(', 'DANCE_'
    ],
    VALID_ZMK_RGB: ['RGB_TOG', 'RGB_EFF', 'RGB_EFR', 'RGB_HUI', 'RGB_HUD', 'RGB_SAI', 'RGB_SAD', 'RGB_BRI', 'RGB_BRD', 'RGB_SPI', 'RGB_SPD', 'RGB_COLOR_HSB'],
    RGB_MAP: { "RGB_VAI": "RGB_BRI", "RGB_VAD": "RGB_BRD", "RGB_MODE_FORWARD": "RGB_EFF", "RGB_MODE_REVERSE": "RGB_EFR", "RGB_MOD": "RGB_EFF", "RGB_RMOD": "RGB_EFR" },
    
    QMK_TO_ZMK_MAP: {
        // Basic Keys
        "ENT": "ENTER", "RET": "ENTER", "ENTER": "ENTER",
        "ESC": "ESC", "ESCAPE": "ESC",
        "SPC": "SPACE", "SPACE": "SPACE",
        "BSPC": "BACKSPACE", "BACKSPACE": "BACKSPACE",
        "DEL": "DELETE", "DELETE": "DELETE",
        "TAB": "TAB",
        
        // Navigation
        "UP": "UP", "DOWN": "DOWN", "LEFT": "LEFT", "RGHT": "RIGHT", "RIGHT": "RIGHT",
        "PGUP": "PG_UP", "PAGE_UP": "PG_UP", 
        "PGDN": "PG_DN", "PAGE_DOWN": "PG_DN",
        "HOME": "HOME", "END": "END",
        
        // Modifiers
        "LSFT": "LSHIFT", "LSHFT": "LSHIFT", "LEFT_SHIFT": "LSHIFT", 
        "LCTL": "LCTRL", "LEFT_CTRL": "LCTRL",
        "LALT": "LALT", "LEFT_ALT": "LALT",
        "LGUI": "LGUI", "LEFT_GUI": "LGUI",
        "RSFT": "RSHIFT", "RSHFT": "RSHIFT", "RIGHT_SHIFT": "RSHIFT",
        "RCTL": "RCTRL", "RIGHT_CTRL": "RCTRL",
        "RALT": "RALT", "RIGHT_ALT": "RALT",
        "RGUI": "RGUI", "RIGHT_GUI": "RGUI",
        
        // Symbols & Punctuation
        "AT": "AT", 
        "HASH": "HASH", 
        "DLR": "DOLLAR", "DLLR": "DOLLAR",
        "PERC": "PERCENT", "PRCNT": "PERCENT",
        "EXLM": "EXCLAMATION", "EXCL": "EXCLAMATION",
        "AMPR": "AMPERSAND", "AMPS": "AMPERSAND",
        "ASTR": "ASTERISK", "STAR": "ASTERISK",
        "CIRC": "CARET",
        "MINS": "MINUS", "PLUS": "PLUS", "EQL": "EQUAL", "UNDS": "UNDER",
        "QUOT": "SQT", "QUOTE": "SQT", "DQUO": "DQT",
        "COMM": "COMMA", "COMMA": "COMMA", "DOT": "DOT",
        "SLSH": "FSLH", "SLASH": "FSLH", "BSLS": "BSLH", "PIPE": "PIPE", "QUES": "QMARK",
        "GRV": "GRAVE", "TILD": "TILDE",
        "LPRN": "LPAR", "RPRN": "RPAR",
        "LCBR": "LBRC", "RCBR": "RBRC", 
        "LBRC": "LBKT", "RBRC": "RBKT",
        "LABK": "LT", "RABK": "GT",
        "COLN": "COLON", "SCLN": "SEMI",
        
        // Media
        "VOLU": "C_VOL_UP", "AUDIO_VOL_UP": "C_VOL_UP",
        "VOLD": "C_VOL_DN", "AUDIO_VOL_DOWN": "C_VOL_DN",
        "MUTE": "C_MUTE", "AUDIO_MUTE": "C_MUTE",
        "MPLY": "C_PP", "MEDIA_PLAY_PAUSE": "C_PP",
        "MNXT": "C_NEXT", "MEDIA_NEXT_TRACK": "C_NEXT",
        "MPRV": "C_PREV", "MEDIA_PREV_TRACK": "C_PREV",
        "MSTP": "C_STOP", "MEDIA_STOP": "C_STOP",
        "BRIU": "C_BRI_UP", "BRIGHTNESS_UP": "C_BRI_UP",
        "BRID": "C_BRI_DN", "BRIGHTNESS_DOWN": "C_BRI_DN",
        
        // Numpad
        "P1": "KP_N1", "P2": "KP_N2", "P3": "KP_N3", "P4": "KP_N4", "P5": "KP_N5", 
        "P6": "KP_N6", "P7": "KP_N7", "P8": "KP_N8", "P9": "KP_N9", "P0": "KP_N0",
        "KP_1": "KP_N1", "KP_2": "KP_N2", "KP_3": "KP_N3", "KP_4": "KP_N4", "KP_5": "KP_N5", 
        "KP_6": "KP_N6", "KP_7": "KP_N7", "KP_8": "KP_N8", "KP_9": "KP_N9", "KP_0": "KP_N0",
        "PDOT": "KP_DOT", "KP_DOT": "KP_DOT",
        "PENT": "KP_ENTER", "KP_ENTER": "KP_ENTER",
        "PPLS": "KP_PLUS", "KP_PLUS": "KP_PLUS",
        "PMNS": "KP_MINUS", "KP_MINUS": "KP_MINUS",
        "PAST": "KP_MULTIPLY", "KP_ASTERISK": "KP_MULTIPLY",
        "PSLS": "KP_DIVIDE", "KP_SLASH": "KP_DIVIDE",
        "PEQL": "KP_EQUAL", "KP_EQUAL": "KP_EQUAL",
        "NUM": "KP_NUM",
        
        // Special & System
        "NO": "none", "XXXXXXX": "none",
        "TRNS": "trans", "TRANSPARENT": "trans",
        "PSCR": "PSCRN", "PSCRN": "PSCRN", 
        "PAUS": "PAUSE_BREAK", "PAUSE_BREAK": "PAUSE_BREAK", 
        "SLCK": "SLCK", "CAPS": "CAPS", "INS": "INS"
    }
};

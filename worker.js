translateAst: (rawToken, state, layerIdx = null, keyIdx = null) => {
        if (!rawToken) return { value: "&none" };
        let tok = rawToken.trim();

        // CAPTURE RICH CONTEXT (Macros & ZSA Tap Dances)
        let configInfo = null;
        let cleanTok = tok.replace(/^TD\(/, '').replace(/\)$/, '').trim();
        if (state.tapDances && state.tapDances[cleanTok]) configInfo = state.tapDances[cleanTok];
        else if (state.macros && state.macros[cleanTok]) configInfo = state.macros[cleanTok];
        
        let positionName = layerIdx === "Combo" ? "Inside Combo" : Utils.getVoyagerPosition(keyIdx);
        const context = { layer: layerIdx, pos: positionName, config: configInfo };
        
        if (Constants.DEALBREAKER_KEYS.some(bad => tok.includes(bad))) {
            Utils.logConversion(state, rawToken, "&none", "warning", Utils.getZmkSuggestion(rawToken), context);
            return { value: "&none" };
        }

        let resolveCount = 0;
        while (state.defines[tok] && resolveCount < 10) { tok = state.defines[tok]; resolveCount++; }

        let match = tok.match(/^([A-Z0-9_]+)\((.*)\)$/i);
        if (match) {
            let func = match[1].toUpperCase();
            let innerTokens = Parser.splitQmkKeys(match[2]);
            let modMap = {"LSFT":"LS", "LCTL":"LC", "LALT":"LA", "LGUI":"LG", "LCMD":"LG", "LWIN":"LG", "LOPT":"LA", "RSFT":"RS", "RCTL":"RC", "RALT":"RA", "RGUI":"RG", "RCMD":"RG", "RWIN":"RG", "ROPT":"RA", "S":"LS", "C":"LC", "A":"LA", "G":"LG", "ALGR":"RA"}; 
            if (modMap[func]) func = modMap[func];

            // Map standard QMK Mod-Tap macros to ZMK Mod-Taps (&mt)
            const modTapMap = {
                "LCTL_T": "LCTRL", "CTL_T": "LCTRL", "C_T": "LCTRL",
                "LSFT_T": "LSHIFT", "SFT_T": "LSHIFT", "S_T": "LSHIFT",
                "LALT_T": "LALT", "ALT_T": "LALT", "A_T": "LALT", "LOPT_T": "LALT", "OPT_T": "LALT",
                "LGUI_T": "LGUI", "GUI_T": "LGUI", "CMD_T": "LGUI", "LCMD_T": "LGUI", "WIN_T": "LGUI", "LWIN_T": "LGUI",
                "RCTL_T": "RCTRL", 
                "RSFT_T": "RSHIFT", 
                "RALT_T": "RALT", "ROPT_T": "RALT", "ALGR_T": "RALT",
                "RGUI_T": "RGUI", "RCMD_T": "RGUI", "RWIN_T": "RGUI"
            };

            if (modTapMap[func]) {
                let p0 = Parser.parseMacroParam(innerTokens[0], state, context);
                if (!p0 || p0.value === "none") return { value: "&none" };
                Utils.logConversion(state, rawToken, `&mt ${modTapMap[func]} ${p0.value}`, "hold_tap");
                return { value: "&mt", params: [{ value: modTapMap[func] }, p0] };
            }

            if (func === 'OSM') {
                let p0 = Parser.parseMacroParam(innerTokens[0], state, context);
                if (!p0 || p0.value === "none") return { value: "&none" }; 
                Utils.logConversion(state, rawToken, "&sk", "hold_tap");
                return { value: "&sk", params: [p0] };
            }
            if (['MEH_T', 'HYPR_T', 'ALL_T'].includes(func)) {
                let modAST = (func === 'MEH_T') ? { value: "LC", params: [{ value: "LS", params: [{ value: "LALT" }] }] } : { value: "LC", params: [{ value: "LS", params: [{ value: "LA", params: [{ value: "LGUI" }] }] }] };
                let p0 = Parser.parseMacroParam(innerTokens[0], state, context);
                if (!p0 || p0.value === "none") return { value: "&none" };
                Utils.logConversion(state, rawToken, `&mt HYPR/MEH`, "hold_tap");
                return { value: "&mt", params: [modAST, p0] };
            }
            
            // Note the addition of 'TG' for Toggle Layers
            if (['MT', 'LT', 'OSL', 'TT', 'TG', 'TO', 'MO'].includes(func)) {
                let params = [];
                if (['LT', 'OSL', 'TT', 'TG', 'TO', 'MO'].includes(func)) {
                    let p0 = innerTokens[0] ? innerTokens[0].trim() : "0";
                    let layerNum = state.defines[p0] !== undefined ? state.defines[p0] : parseInt(p0);
                    params.push({ value: isNaN(layerNum) ? p0 : layerNum });
                } else if (func === 'MT') {
                    let p0 = Parser.parseMacroParam(innerTokens[0], state, context);
                    if (!p0 || p0.value === "none") return { value: "&none" };
                    params.push(p0);
                }
                if (innerTokens.length > 1) {
                    let p1 = Parser.parseMacroParam(innerTokens[1], state, context);
                    if (!p1 || p1.value === "none") return { value: "&none" }; 
                    params.push(p1);
                }
                let zmkFunc = (func === 'TT' || func === 'TG') ? '&tog' : func === 'OSL' ? '&sl' : `&${func.toLowerCase()}`;
                Utils.logConversion(state, rawToken, zmkFunc, "hold_tap");
                return { value: zmkFunc, params };
            }
            
            let parsedParams = innerTokens.map(p => Parser.parseMacroParam(p, state, context)).filter(p => p && p.value !== "none");
            if (parsedParams.length === 0) return { value: "&none" };

            if (['LS', 'LC', 'LA', 'LG', 'RS', 'RC', 'RA', 'RG', 'S', 'C', 'A', 'G', 'ALGR'].includes(func)) {
                Utils.logConversion(state, rawToken, "Nested Modifiers", "layer_binding");
                return { value: "&kp", params: [{ value: func, params: parsedParams }] };
            }
            return { value: `&${func.toLowerCase()}`, params: parsedParams };
        }

        let bareResolved = Parser.resolveZmkKeycode(tok, rawToken, state, context);
        if (bareResolved === "trans" || bareResolved === "none") return { value: `&${bareResolved}` };
        if (bareResolved === "CW_TOGG") { Utils.logConversion(state, rawToken, "&caps_word", "layer_binding"); return { value: "&caps_word" }; }
        if (bareResolved === "QK_BOOT" || bareResolved === "RESET") { Utils.logConversion(state, rawToken, "&bootloader", "layer_binding"); return { value: "&bootloader" }; }
        
        if (tok.startsWith('RGB_')) {
            let mappedRgb = Constants.RGB_MAP[tok] || tok;
            if (Constants.VALID_ZMK_RGB.includes(mappedRgb)) {
                Utils.logConversion(state, rawToken, mappedRgb, "layer_binding");
                return { value: "&rgb_ug", params: [{value: mappedRgb}] };
            }
            Utils.logConversion(state, rawToken, "&none", "warning", "RGB animation is a proprietary feature.", context);
            return { value: "&none" };
        }
        
        if (bareResolved.startsWith('MOVE_')) { Utils.logConversion(state, rawToken, "&mmv", "layer_binding"); return { value: "&mmv", params: [{ value: bareResolved }] }; }
        if (bareResolved.startsWith('SCRL_')) { Utils.logConversion(state, rawToken, "&msc", "layer_binding"); return { value: "&msc", params: [{ value: bareResolved }] }; }
        if (['MB1', 'MB2', 'MB3', 'MB4', 'MB5'].includes(bareResolved)) { Utils.logConversion(state, rawToken, "&mkp", "layer_binding"); return { value: "&mkp", params: [{ value: bareResolved }] }; }

        Utils.logConversion(state, rawToken, bareResolved, "layer_binding");
        return { value: "&kp", params: [{ value: bareResolved }] };
    },

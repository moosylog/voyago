<sup> AI generated</sup>

  
# 🚀 VoyaGo

**Endgame Migration from ZSA Voyager to MoErgo Go60.**

You’ve finally made the leap. You are upgrading from the 52-key ZSA Voyager to the next generation of ergonomic typing: the **MoErgo Go60**. 

Leaving behind the hardware is the easy part—leaving behind your layout is where it gets tough. You’ve spent a lot of time in ZSA Oryx meticulously crafting your perfect layers, combos, and hold-taps. Rebuilding all of that from scratch in a completely different firmware ecosystem (ZMK) is a tedious, error-prone headache.

**VoyaGo makes it a one-click process.** VoyaGo is a powerful, client-side web tool that instantly translates ZSA’s proprietary QMK C-code into a deeply structured, fully validated ZMK JSON file. It doesn’t just map keys; it safely splices your Voyager layout directly into the Go60's default trackball and encoder ecosystem, ready to be imported into the MoErgo Layout Editor.

---

## ✨ Why VoyaGo? The Upgrade Advantage

Moving from QMK (Oryx) to ZMK (MoErgo) involves navigating two completely different architectures. VoyaGo bridges that gap instantly:

* **🧠 Intelligent Layer Splicing:** The Voyager has 52 keys; the Go60 has 66 (including trackballs and encoders). VoyaGo precisely overlays your 52 keys onto the Go60 template, padding the empty spaces with transparent (`&trans`) keys so MoErgo's default trackball and display settings shine through untouched.
* **🌳 Deep AST Modifier Translation:** ZMK strictly enforces Abstract Syntax Trees for nested keys. VoyaGo mathematically unwraps your QMK macros (like `MOD_HYPR` or `LGUI(LSFT(KC_A))`) and compiles them into valid, deeply nested ZMK JSON arrays.
* **🎨 Per-Key RGB Preservation:** Don't lose your lighting! VoyaGo rips the hidden `HSV` color matrix out of the ZSA source code, calculates the math, and injects exact HEX codes into your Go60 layout.
* **⚙️ Auto-Generated Combos:** Migrates your complex multi-key combos perfectly, calculating the exact ZMK matrix positions required for the Go60's physical layout.
* **🛠️ The "Action Required" Report:** ZSA uses proprietary, closed-source C code for things like Tap-Dances, Auto-Mouse, and Siri macros that don't translate 1:1 into standard ZMK. VoyaGo catches these dealbreakers, safely leaves the key blank, and generates a printable UI report detailing exactly *what* the feature was, *where* it lived, and *how* to rebuild it.

---

## 📖 How to Use VoyaGo

VoyaGo does everything locally in your browser for maximum privacy and lightning-fast speed. No server uploads required.

1. **Get Your Source:** Open your layout in ZSA Oryx, click the `< >` icon, and select **Download Source** (Do *not* click the main Download Firmware button).
2. **Drop it in VoyaGo:** Drag and drop the downloaded `.zip` (or the `keymap.c` file) into the VoyaGo drop zone.
3. **Review the Report:** VoyaGo processes the C-code in milliseconds. Review the UI to see how many standard keys, modifiers, and combos were successfully ported.
4. **Download & Import:** Click **Download Layout** to get your newly minted `_Appended.json` file, and drag it directly into the [MoErgo Layout Editor](https://layout.moergo.com).

---


## 🔍 Under the Hood: Conversion Matrix

Moving layouts across firmware ecosystems is notoriously difficult. Here is exactly what VoyaGo handles automatically, and what requires a quick manual touch-up in the MoErgo Layout Editor.

| Feature | Translation Status | Notes |
| :--- | :--- | :--- |
| **Alphas, Numbers, & Symbols** | ✅ 100% Automated | 1:1 mapping to ZMK standard keycodes. |
| **F-Keys, Numpad, & Nav** | ✅ 100% Automated | 1:1 mapping to ZMK standard keycodes. |
| **Combos (Chords)** | ✅ 100% Automated | Extracts key combinations, recalculates the geometry for the Go60 matrix, and assigns the correct layer math. |
| **Hold-Taps (`LT`, `MT`)** | ✅ 100% Automated | Deeply nested modifiers safely parsed and translated to ZMK format. |
| **Layer Toggles (`MO`, `TG`, `TO`)** | ✅ 100% Automated | Layer integers are dynamically shifted to append safely below the Go60 base layers. |
| **Sticky Keys / One-Shot (`OSM`)** | ✅ 100% Automated | Unwrapped and natively converted to ZMK `&sk`. |
| **Native Mouse Keys** | ✅ 100% Automated | Safely mapped to MoErgo `LCLK`, `RCLK`, `MCLK`, and scroll/move keys (`&mmv` / `&msc`). |
| **Media & System Controls** | ✅ 100% Automated | Volume, display brightness, and playback keys flawlessly mapped. |
| **Hardware Controls (BT, Reset)** | ✅ 100% Automated | Maps Bluetooth clearing, Bootloader, and Sys Reset commands safely. |
| **Caps Word (`CW_TOGG`)** | ✅ 100% Automated | Cleanly converted to ZMK `&caps_word`. |
| **RGB Lighting Controls** | ✅ 100% Automated | Standard toggles and hue/saturation/brightness mapped to `&rgb_ug`. |
| **Custom Layer Colors** | ✅ 100% Automated | ZSA's hidden HSV matrix is extracted, mathematically converted to HEX, and bound as JSON decorations. |
| **Tap Dances (`TD`)** | ⚠️ Manual Action | Must be rebuilt in the Layout Editor using ZMK's native *Mod-Morph* or *Tap-Dance* behaviors. |
| **Custom Macros (`ST_MACRO`)** | ⚠️ Manual Action | Multi-keystroke text macros must be rebuilt in the ZMK Macro editor. |
| **Oryx "Magic" Keys** | ⚠️ Manual Action | "Mouse Jiggler", "Drag Scroll", and "Dynamic CPI" are proprietary ZSA C-code and must be replaced with native MoErgo features. |

---

<sup> AI generated</sup>

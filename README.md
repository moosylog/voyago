<sup> AI generated</sup>
<div align="center">
  
# 🚀 VoyaGo

**The ultimate layout migration tool: from ZSA Voyager to MoErgo Go60.**

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

Here is exactly what VoyaGo handles automatically, and what requires a quick manual touch-up in the MoErgo editor.

| Feature | Translation Status | Notes |
| :--- | :--- | :--- |
| **Alphas, Numbers, & Symbols** | ✅ 100% Automated | 1:1 mapping to ZMK standard. |
| **F-Keys & Numpad Keys** | ✅ 100% Automated | 1:1 mapping to ZMK standard. |
| **Hold-Taps (`LT`, `MT`)** | ✅ 100% Automated | Deeply nested modifiers safely parsed. |
| **Sticky Keys / One-Shot** | ✅ 100% Automated | Converted to ZMK `&sk`. |
| **Layer Toggles (`TG`, `TO`)** | ✅ 100% Automated | Layer math is automatically shifted to preserve Go60 base layers. |
| **Native Mouse Keys** | ✅ 100% Automated | Safely mapped to MoErgo `LCLK`, `RCLK`, and `&mmv`. |
| **Custom Layer Colors** | ✅ 100% Automated | HSV extracted and bound to the ZMK JSON schema. |
| **Tap Dances (`TD`)** | ⚠️ Manual Action | Must be rebuilt using ZMK's native *Mod-Morph* or *Tap-Dance* tools. |
| **Custom Macros (`ST_MACRO`)** | ⚠️ Manual Action | Text-typing macros must be rebuilt in the ZMK Macro editor. |
| **Oryx "Magic" Keys** | ⚠️ Manual Action | "Mouse Jiggler", "Drag Scroll", etc., are proprietary to ZSA and must be replaced with native MoErgo equivalents. |

---

## 💻 Built for Speed

VoyaGo is built with vanilla HTML/JS and Tailwind CSS. It utilizes a dedicated JavaScript Web Worker to chew through massive, thousands-of-lines QMK C-files without freezing your browser. Featuring aggressive cache-busting, dynamic AST JSON generation, and secure fallback proxy-fetching for the MoErgo templates, it guarantees a seamless upgrade path.

**Stop re-typing layouts. Start typing.**

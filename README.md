# Obsidian の Kana

**Obsidian の Kana** is a plugin for [Obsidian](https://obsidian.md) that enables seamless conversion of text between different Japanese scripts (Kana, Hiragana, Katakana, and Romaji) directly within your markdown files. Ideal for learners and professionals working with Japanese text, this plugin simplifies text transformation using intuitive hotkeys.

---

## Features

-   **Script Conversion:** Convert selected text between:
    -   **Kana**: Converts Romaji to Kana (Hiragana + Katakana).
    -   **Hiragana**: Converts Romaji to Hiragana.
    -   **Katakana**: Converts Romaji to Katakana.
    -   **Romaji**: Converts Kana back to Romaji.
-   **Customizable Hotkeys:** Preconfigured hotkeys for each conversion type:
    -   Kana: `Ctrl+K`
    -   Hiragana: `Alt+H`
    -   Katakana: `Alt+K`
    -   Romaji: `Alt+R`
-   **Settings Tab:** A user-friendly interface to access resources and support.
-   **Open Source:** Freely available for feature requests and contributions.

---

## Installation

### From Community Plugins

1. Open Obsidian.
2. Navigate to `Settings > Community Plugins > Browse`.
3. Search for **Obsidian の Kana**.
4. Click "Install" and enable the plugin.

### Manual Installation

1. Download the latest release from the [GitHub Releases](https://github.com/ToniG22/ObsidianNoKana/releases).
2. Copy `main.js`, `manifest.json`, and `styles.css` to your vault’s plugin folder:
    ```
    VaultFolder/.obsidian/plugins/obsidian-no-kana/
    ```
3. Enable the plugin in `Settings > Community Plugins`.

---

## Usage

1. Highlight the text you want to convert in the editor.
2. Use the appropriate hotkey to perform the desired conversion:
    - **Kana:** `Ctrl+K`
    - **Hiragana:** `Alt+H`
    - **Katakana:** `Alt+K`
    - **Romaji:** `Alt+R`
3. The selected text will be replaced with the converted script.

---

## Settings

-   Open the settings tab for:
    -   Access to the [GitHub Repository](https://github.com/ToniG22/ObsidianNoKana).
    -   Support the developer with a [donation](https://www.buymeacoffee.com/tonig22).

---

## Development

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher).
-   Basic knowledge of TypeScript and the Obsidian plugin API.

### Quick Start

1. Clone the repository:
    ```bash
    git clone https://github.com/ToniG22/ObsidianKana.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start development mode:
    ```bash
    npm run dev
    ```
4. Place the compiled files in your vault’s plugin folder:
    ```
    VaultFolder/.obsidian/plugins/obsidian-no-kana/
    ```
5. Reload Obsidian to test your changes.

---

## Contributing

Contributions are welcome! Whether it’s a bug fix, new feature, or documentation improvement:

1. Fork the repository.
2. Create a new branch.
3. Submit a pull request.

---

## Support

If you find this plugin helpful, consider supporting its development:

-   [Buy Me a Coffee](https://www.buymeacoffee.com/tonig22).
-   Share the plugin with others!

For feature requests or issues, visit the [GitHub Issues Page](https://github.com/ToniG22/ObsidianNoKana/issues).

---

## License

This plugin is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## Acknowledgments

-   [Wanakana.js](https://github.com/WaniKani/WanaKana): For handling Japanese text conversion.
-   The Obsidian Community: For creating such a versatile platform.

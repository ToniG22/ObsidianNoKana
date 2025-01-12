import {
	App,
	Editor,
	MarkdownView,
	Plugin,
	PluginSettingTab,
	Setting,
	Modifier,
} from "obsidian";

import { toKana, toHiragana, toKatakana, toRomaji, isRomaji } from "wanakana";

interface ObsidianNoKanaSettings {
	hotkeys: {
		kana: string;
		hiragana: string;
		katakana: string;
		romaji: string;
	};
}

const DEFAULT_SETTINGS: ObsidianNoKanaSettings = {
	hotkeys: {
		kana: "Ctrl+K",
		hiragana: "Alt+H",
		katakana: "Alt+K",
		romaji: "Alt+R",
	},
};

export default class ObsidianNoKana extends Plugin {
	settings: ObsidianNoKanaSettings;

	async onload() {
		await this.loadSettings();

		await this.saveSettings();

		this.registerConversionCommand(
			"kana",
			"Replace Romaji with Kana",
			this.settings.hotkeys.kana
		);
		this.registerConversionCommand(
			"hiragana",
			"Replace Romaji with Hiragana",
			this.settings.hotkeys.hiragana
		);
		this.registerConversionCommand(
			"katakana",
			"Replace Romaji with Katakana",
			this.settings.hotkeys.katakana
		);
		this.registerConversionCommand(
			"romaji",
			"Replace Kana with Romaji",
			this.settings.hotkeys.romaji
		);

		this.addSettingTab(new ObsidianNoKanaSettingTab(this.app, this));
	}

	onunload() {}

	registerConversionCommand(type: string, name: string, hotkey: string) {
		this.addCommand({
			id: `convert-${type}`,
			name,
			hotkeys: this.parseHotkey(hotkey),
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				const converted = this.convertSelection(selection, type);
				editor.replaceSelection(converted);
			},
		});
	}

	convertSelection(selection: string, type: string): string {
		switch (type) {
			case "kana":
				return isRomaji(selection) ? toKana(selection) : selection;
			case "hiragana":
				return isRomaji(selection) ? toHiragana(selection) : selection;
			case "katakana":
				return isRomaji(selection) ? toKatakana(selection) : selection;
			case "romaji":
				return toRomaji(selection);
			default:
				return selection;
		}
	}

	parseHotkey(
		hotkey: string | undefined
	): { modifiers: Modifier[]; key: string }[] {
		if (!hotkey) {
			console.warn("Invalid or undefined hotkey. Using default.");
			return [];
		}

		const parts = hotkey.split("+");
		const key = parts.pop();
		const modifiers = parts.map((part) => part.trim() as Modifier);

		if (!key) {
			console.warn(
				"Invalid hotkey format. Ensure it's in the format 'Modifier + Letter'."
			);
			return [];
		}

		return [
			{
				modifiers,
				key,
			},
		];
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
		if (!this.settings.hotkeys) {
			this.settings.hotkeys = DEFAULT_SETTINGS.hotkeys; // Ensure hotkeys exist
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ObsidianNoKanaSettingTab extends PluginSettingTab {
	plugin: ObsidianNoKana;

	constructor(app: App, plugin: ObsidianNoKana) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// Add an introductory phrase
		var infoText = document.createElement("p");
		infoText.style.textAlign = "center";
		infoText.appendText(
			"This code is open source, and feature requests can be made on the repository. Feel free to use the code however you want."
		);
		containerEl.appendChild(infoText);

		// Create the GitHub button
		var githubButton = document.createElement("a");
		githubButton.href = "https://github.com/ToniG22";
		githubButton.target = "_blank";
		githubButton.style.display = "flex";
		githubButton.style.alignItems = "center";
		githubButton.style.justifyContent = "center";
		githubButton.style.margin = "10px auto";
		githubButton.style.textAlign = "center";
		githubButton.style.textDecoration = "none";
		githubButton.style.padding = "10px 20px";
		githubButton.style.width = "300px";
		githubButton.style.color = "#000000";
		githubButton.style.backgroundColor = "white";
		githubButton.style.borderRadius = "5px";
		githubButton.style.fontFamily = "Arial, sans-serif";
		githubButton.style.fontSize = "16px";

		// Add GitHub icon
		var githubIcon = document.createElement("img");
		githubIcon.src =
			"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
		githubIcon.alt = "GitHub Logo";
		githubIcon.style.width = "25px";
		githubIcon.style.height = "25px";
		githubIcon.style.marginRight = "10px";

		// Add text to the button
		var githubText = document.createElement("span");
		githubText.innerText = "View on GitHub";
		githubButton.style.fontWeight = "bold";

		// Append icon and text to the button
		githubButton.appendChild(githubIcon);
		githubButton.appendChild(githubText);
		containerEl.appendChild(githubButton);

		// Create a container for donation-related elements
		var donateContainer = document.createElement("div");
		donateContainer.style.marginTop = "auto";
		donateContainer.style.textAlign = "center";
		donateContainer.style.paddingTop = "20px";

		// Add a text paragraph to the donation container
		var donateText = document.createElement("p");
		donateText.style.textAlign = "center";
		donateText.appendText(
			"If this plugin helped you in any way consider supporting, thanks!"
		);
		donateContainer.appendChild(donateText);

		// Create the <a> element for donation
		var donateButton = document.createElement("a");
		donateButton.href = "https://www.buymeacoffee.com/tonig22";
		donateButton.target = "_blank";

		// Create the <img> element for donation
		var donateImage = document.createElement("img");
		donateImage.src =
			"https://img.buymeacoffee.com/button-api/?text=Buy me a コーヒー&emoji=☕&slug=tonig22&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff";
		donateImage.alt = "Buy me a コーヒー";

		// Append the <img> to the <a>
		donateButton.appendChild(donateImage);
		donateContainer.appendChild(donateButton);

		// Append the donation container to the main container
		containerEl.appendChild(donateContainer);
	}
}

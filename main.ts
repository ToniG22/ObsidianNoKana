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

interface SidianNoKanaSettings {
	hotkeys: {
		kana: string;
		hiragana: string;
		katakana: string;
		romaji: string;
	};
}

const DEFAULT_SETTINGS: SidianNoKanaSettings = {
	hotkeys: {
		kana: "",
		hiragana: "",
		katakana: "",
		romaji: "",
	},
};

export default class SidianNoKana extends Plugin {
	settings: SidianNoKanaSettings;

	async onload() {
		await this.loadSettings();

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

		this.addSettingTab(new SidianNoKanaSettingTab(this.app, this));
	}

	onunload() {}

	registerConversionCommand(type: string, name: string, hotkey: string) {
		this.addCommand({
			id: `convert-${type}`,
			name,
			hotkeys: hotkey ? this.parseHotkey(hotkey) : undefined,
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

class SidianNoKanaSettingTab extends PluginSettingTab {
	plugin: SidianNoKana;

	constructor(app: App, plugin: SidianNoKana) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		const infoText = document.createElement("p");
		infoText.className = "sidian-no-kana-info";
		infoText.innerText =
			"This code is open source, and feature requests can be made on the repository. Feel free to use the code however you want.";
		containerEl.appendChild(infoText);

		const githubButton = document.createElement("a");
		githubButton.href = "https://github.com/ToniG22/sidian-no-kana";
		githubButton.target = "_blank";
		githubButton.className = "sidian-no-kana-github-button";

		const githubIcon = document.createElement("img");
		githubIcon.src =
			"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
		githubIcon.alt = "GitHub Logo";
		githubIcon.className = "sidian-no-kana-github-icon";

		const githubText = document.createElement("span");
		githubText.innerText = "View on GitHub";
		githubText.className = "sidian-no-kana-github-text";

		githubButton.appendChild(githubIcon);
		githubButton.appendChild(githubText);
		containerEl.appendChild(githubButton);

		const donateContainer = document.createElement("div");
		donateContainer.className = "sidian-no-kana-donate-container";

		const donateText = document.createElement("p");
		donateText.innerText =
			"If this plugin helped you in any way consider supporting, thanks!";
		donateText.className = "sidian-no-kana-donate-text";
		donateContainer.appendChild(donateText);

		const donateButton = document.createElement("a");
		donateButton.href = "https://www.buymeacoffee.com/tonig22";
		donateButton.target = "_blank";

		const donateImage = document.createElement("img");
		donateImage.src =
			"https://img.buymeacoffee.com/button-api/?text=Buy me a コーヒー&emoji=☕&slug=tonig22&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff";
		donateImage.alt = "Buy me a コーヒー";
		donateButton.appendChild(donateImage);
		donateContainer.appendChild(donateButton);

		containerEl.appendChild(donateContainer);
	}
}

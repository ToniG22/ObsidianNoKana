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

export default class SidianNoKana extends Plugin {

	async onload() {

		this.registerConversionCommand(
			"kana",
			"Replace Romaji with Kana",
		);
		this.registerConversionCommand(
			"hiragana",
			"Replace Romaji with Hiragana",
		);
		this.registerConversionCommand(
			"katakana",
			"Replace Romaji with Katakana",
		);
		this.registerConversionCommand(
			"romaji",
			"Replace Kana with Romaji",
		);

		this.addSettingTab(new SidianNoKanaSettingTab(this.app, this));
	}

	onunload() {}

	registerConversionCommand(type: string, name: string) {
		this.addCommand({
			id: `convert-${type}`,
			name,
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

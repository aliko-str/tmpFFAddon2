/*global browser */





browser.browserAction.onClicked.addListener(() => {
	var aTab;
	browser.tabs.create({
		url: "https://www.chartjs.org/"
	}).then(function(_aTab) {
		aTab = _aTab;
		browser.webNavigation.onCompleted.addListener((details) => {
			if (details.tabId === aTab.id && details.frameId === 0) {
				browser.tabs.sendMessage(aTab.id, {"action": "run"}, {frameId: 0});
			}
		});
	});
});



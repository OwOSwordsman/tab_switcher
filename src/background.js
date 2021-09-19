// switch active tab
function switchTab(id) {
    // first set current tab inactive, then set previous tab as active
    chrome.tabs.update({ active: false });
    chrome.tabs.update(id, { active: true });
}

// listen for keyboard shortcut press
chrome.commands.onCommand.addListener(function (command) {
    // switch tabs
    chrome.storage.local.get('lastTab', function (tab) {
        switchTab(tab.lastTab);
    });
});

// update stored tab ids
chrome.tabs.onActivated.addListener(function (activeInfo) {
    // set the previous current tab to last tab
    chrome.storage.local.get('currentTab', function (tab) {
        let currentTab = tab.currentTab;
        chrome.storage.local.set({ 'lastTab': currentTab });
    });

    // update current tab with current tab
    let currentTab = activeInfo.tabId;
    chrome.storage.local.set({ 'currentTab': currentTab });
});
let bookMarks = [];
let mainIndex = 0;
chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.set({ bookMarks });
    chrome.storage.sync.set({ mainIndex });

});
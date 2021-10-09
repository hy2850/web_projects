let tabList = document.querySelector(".tablist");

// getAllInWindow -> deprecated
chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabArr)=>{
    // console.log(tabArr);
    tabArr.map((tab, idx) => {
        // console.log(tab)

        // Create tab entry
        let entry = document.createElement("li");
        entry.innerHTML = 
        `${tab.title}<br/>${tab.url}<br/>`;

        // Save button
        let but = document.createElement("button");
        but.innerHTML = "Save";
        but.addEventListener("click", async () => {
            console.log(`${idx} - button clicked`);
            // chrome.storage.sync.get(['key'], function(result) {
            //     console.log('Value currently is ' + result.key);
            // });
        });

        entry.appendChild(but);
        tabList.appendChild(entry);
    });
});

// chrome.storage : localStorage-like
// https://developer.chrome.com/docs/extensions/reference/storage/
// chrome.storage.sync.set({key: value}, function() {
//     console.log('Value is set to ' + value);
// });

// chrome.storage.sync.get(['key'], function(result) {
//     console.log('Value currently is ' + result.key);
// });

let body = document.getElementById("indexBody");
console.log(body);
body.textContent = "script test";
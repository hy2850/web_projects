let tabList = document.querySelector(".tablist");

// getAllInWindow -> deprecated
chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabArr)=>{
    

    // const body = document.querySelector("#indexBody");
    // body.innerHTML = tabArr;

    tabArr.map((tab, idx) => {
        console.log(tab)

        // Create tab entry
        let entry = document.createElement("li");
        entry.innerHTML = JSON.stringify(tab);
        // entry.innerHTML = `${tab.title}<br/>${tab.url}<br/>`;

        // Save button
        let but = document.createElement("button");
        but.innerHTML = "Save";
        but.addEventListener("click", async () => {
            console.log(`${idx} - button clicked`);
            // chrome.storage.sync.get(['key'], function(result) {
            //     console.log('Value currently is ' + result.key);
            // });
        });

        // entry.appendChild(but);
        tabList.appendChild(entry);
    });
});

// function saveToGroup(groupID = 0) {
//     const NAME = `group${groupID}`;
//     chrome.storage.sync.get(NAME, (groupObj) => {
//         if(groupObj === undefined)
//             groupObj = {...groupObj}

//             chrome.storage.sync.set({NAME: value}, function() {
//                 console.log('Value is set to ' + value);
//             });
//     });
// }

// chrome.storage : localStorage-like
// https://developer.chrome.com/docs/extensions/reference/storage/

// value is our group
let groupID = 0;
let key = `group${groupID}`;
let value = {
    name : "study_group",
    id : 0,
    members: [
        {title: "chromeAPI", url: "www.google.com", date: new Date()},
        {title: "youtube", url: "www.youtube.com", date: new Date()},
    ]
}

// Put this into storage
let wrapper = {};
wrapper[key] = value;

chrome.storage.sync.set(wrapper, res=>console.log("success"));
chrome.storage.sync.get(key, res=>console.log(res));

// chrome.storage.sync.set({kkey : obj}, function() {
//     console.log('Value is set to ' + value);
// });

// chrome.storage.sync.get('kkey', function(result) {
//     console.log(result);
// });

let body = document.getElementById("indexBody");
console.log(body);
body.textContent = "script test";
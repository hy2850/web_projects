Ref : https://www.youtube.com/watch?v=Jncoj-Gvh9o&ab_channel=dcode

```JS
// Request alarm permission
Notification.requestPermission().then(permission => {
  console.log(permission);
})
alert(Notification.permission);

// 활용
if(Notification.permission === "granted"){
  alert("we have permission");
}
else if(Notification.permission !== "denied"){
  Notification.requestPermission().then(permission => {
    console.log(permission);
  })
}
```

```JS
// Create notification (alarm goes off in the browser)
const notify = new Notification("Title!", {
    body: "Body goes here",
	icon: './img/notiIcon.png'
});

// Add click event on the notification
notification.addEventListener('click', (evt) => {
	// focus
    window.focus();
	
	// redirect
	window.location.href = "https://www.google.com";
	
	// open in a new tab
	window.open('http://www.mozilla.org', '_blank');
	
    evt.target.close();
});
```

Focus to the tab/window when notification is clicked
https://stackoverflow.com/questions/4906976/how-to-get-focus-to-a-chrome-tab-which-created-desktop-notification/40964355#40964355
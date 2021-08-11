Pomodoro timer
Simple timer tool to maximize productivity

</br>

To-do

- [x] <span style="color:blue">[28June21]</span>Design (Buttons, clock, ...) </br>
  - Different color theme for Night mode?
- [x] <span style="color:blue">[12June21]</span> User time setting
  - [x] <span style="color:blue">[1July21]</span> (Preserve settings even when refreshed -> use **browser cache**?)
- [x] <span style="color:blue">[17June21]</span> Add one more clock → long-cycle (45min+) clock
      (Dual clock feature, each running separately)
      **(Componentize using React)**
- [x] <span style="color:blue">[31June21]</span> Short Break (1st clock), Long break (2nd clock)
  - [x] <span style="color:blue">[27July21'R]</span>Also give user option to set break time?)
- [ ] Night mode (white -> black, black -> white) -> use inbuilt dark mode
- [x] <span style="color:blue">[17June21]</span> Toggle 'start' or create 'pause' button to pause the timer
- [x] <span style="color:blue">[17June21]</span> Keyboard input (space) to toggle start/pause
- [x] <span style="color:blue">[27June21]</span> Keyboard input ('R') to reset
  - [ ] 'RR' to revert to the original timer from break-timer
- [x] <span style="color:blue">[28June21]</span> Different bell for long-timer and fade-out
- [x] <span style="color:blue">[25July21'R']</span> Auto-start after each cycle ends
- [x] <span style="color:blue">[25July21'R']</span> Create general settings for both clock
- [ ] Option in 'Settings', to reset the settings
- [ ] Option to adjust volume of timer sound
- [ ] Change time by clicking and re-writing clock itself

Limited to two timers (further work : react componentize to create more than two timers)

Break mode is not separated - timer to break auto transition is default

함수 별 modularization 잘 한듯.  
reset 재활용해서 pause 만들기  
countDown 재활용해서 break 모드 만들기

</br>

Problem

- [x] Settings) For multiple timer components, need different setting for each component

- [x] Settings) Time setting change is not applied while the timer is already on.

</br>

Further works

- Scheduling (Sign-in, track record) - back-end study?
- Desk-top or mobile application

</br>

References

- Padding
  https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
- Add sound
  https://www.geeksforgeeks.org/how-to-make-a-beep-sound-in-javascript/
- SetInterval SetTimeout
  https://ko.javascript.info/settimeout-setinterval
- localStorage
  ★https://www.daleseo.com/js-web-storage/
  https://velog.io/@yijaee/%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
- JSON
  https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/JSON

- slider
  https://www.w3schools.com/howto/howto_js_rangeslider.asp
- position:fixed center element (modal)
  https://stackoverflow.com/questions/2005954/center-a-positionfixed-element

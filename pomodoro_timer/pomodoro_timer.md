Pomodoro timer
Simple timer tool to maximize productivity

</br>

To-do

- [x] <span style="color:blue">[28June21]</span>Design (Buttons, clock, ...) </br>
  - Different color theme for Night mode?
- [x] <span style="color:blue">[12June21]</span> User time setting
  - [ ] (Preserve settings even when refreshed -> use **browser cache**?)
- [x] <span style="color:blue">[17June21]</span> Add one more clock → long-cycle (45min+) clock
      (Dual clock feature, each running separately)
      **(Componentize using React)**
- [ ] Short Break (1st clock), Long break (2nd clock)
  - [ ] Also give user option to set break time?)
- [ ] Night mode (white -> black, black -> white) -> use inbuilt dark mode
- [ ] Auto-start after each cycle ends
- [x] <span style="color:blue">[17June21]</span>Toggle 'start' or create 'pause' button to pause the timer
- [x] <span style="color:blue">[17June21]</span>Keyboard input (space) to toggle start/pause
- [x] <span style="color:blue">[27June21]</span>Keyboard input ('R') to reset
- [x] <span style="color:blue">[28June21]</span>Different bell for long-timer and fade-out

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

References

- Padding
  https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
- Add sound
  https://www.geeksforgeeks.org/how-to-make-a-beep-sound-in-javascript/
- SetInterval SetTimeout
  https://ko.javascript.info/settimeout-setinterval

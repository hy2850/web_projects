Pomodoro timer
Simple timer tool to maximize productivity

</br>

To-do

- [ ] Design (Buttons, clock, ...)
- [x] <span style="color:blue">[12June21]</span> User time setting
  - [ ] (Preserve settings even when refreshed -> use **browser cache**?)
- [x] <span style="color:blue">[17June21]</span> Add one more clock → long-cycle (45min+) clock
      (Dual clock feature, each running separately)
      **(Componentize using React)**
- [ ] Short Break (1st clock), Long break (2nd clock)
  - [ ] Also give user option to set break time?)
- [ ] Night mode (white -> black, black -> white)
- [ ] Auto-start after each cycle ends
- [X] <span style="color:blue">[17June21]</span>Toggle 'start' or create 'pause' button to pause the timer
- [X] <span style="color:blue">[17June21]</span>Keyboard input (space) to toggle start/pause

Limited to two timers (further work : react componentize to create more than two timers)

</br>

Problem

- [x]  Settings) For multiple timer components, need different setting for each component

- [x] Settings) Time setting change is not applied while the timer is already on.

</br>

References

- Padding
  https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
- Add sound
  https://www.geeksforgeeks.org/how-to-make-a-beep-sound-in-javascript/
- SetInterval SetTimeout
  https://ko.javascript.info/settimeout-setinterval

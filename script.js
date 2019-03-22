document.getElementById("terminalInput").onkeydown = function(){
  
  // user enters a command
  if(event.keyCode === 13) {
        
        // capture the command the user entered and create a container for the response
        let commandEntered = this.value;
        let terminalResponseContainer = document.createElement("div");
        
        // echo back what the user typed each time the enter a command
        let echoInputContainer = document.createElement("p");
        let echoInputLine = document.createTextNode('User-MachineName ~ ⚬→ ' + this.value);
        document.getElementById("terminalHistory").appendChild(echoInputContainer);
        echoInputContainer.appendChild(echoInputLine);
        
        // user enters 'clim8' and sees greeting / introductory overview
        if(commandEntered === 'clim8') {
          let greeting = `
                     <p>Welcome to clim8!</p>
                     <p>The CLI prototyping tool.</p>
                     `;
          document.getElementById("terminalHistory").appendChild(terminalResponseContainer);
          terminalResponseContainer.innerHTML = greeting;
        }

        else if(commandEntered === 'bananas') {
          console.log('bananas')
        }

        // user enters 'clim8 run' and sees a running message 
        // followed by a failure due to missing flags
        // for some reason adding another condition prints BOTH if and else cases

        else {

          // user enters a command not understood by clim8
          let commandNotFoundContainer = document.createElement("p");
          let commandNotFoundText = document.createTextNode(this.value + ': command not found');
          console.log('notfound');
          terminalResponseContainer.appendChild(commandNotFoundContainer);
          document.getElementById("terminalHistory").appendChild(commandNotFoundContainer);
          commandNotFoundContainer.appendChild(commandNotFoundText);
        };
        
        // clear the input after each command is entered
        document.getElementById('terminalInput').value = ''

        // page always stays scrolled to bottom to mimick a terminal window
        window.scrollTo(0,document.body.scrollHeight);
  };
};

// user clears the terminal with CMD + k
let map = {}; 
onkeydown = onkeyup = function(e){
    e = e || event; 
    map[e.keyCode] = e.type == 'keydown';
    if(map[91] && map[75]){ // CMD+K
        document.getElementById("terminalHistory").innerHTML = "";
    };
};
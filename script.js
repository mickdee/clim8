document.getElementById("terminalInput").onkeydown = function(){
  
  // user enters a command
  if(event.keyCode === 13) {

        // capture the command the user entered and create a container for the response
        commandEntered = this.value;
        let terminalResponseContainer = document.createElement("div");
        
        // echo back what the user typed each time the enter a command
        let echoInputContainer = document.createElement("p");
        let echoInputLine = document.createTextNode('User-MachineName ~ ⚬→ ' + this.value);
        document.getElementById("terminalHistory").appendChild(echoInputContainer);
        echoInputContainer.appendChild(echoInputLine);

        // print feedback while the terminal is running a command
        let terminalRunningMessageContainer = document.createElement("div");

        let greeting = `
                     <ul>
                     <li>Welcome to clim8 the CLI prototyping tool!</li>
                     <li>version: 0.1</li>
                     </br>
                     <li>USAGE EXAMPLES</li>
                     </br>
                     <li class="ml-2">clim8 [command]</li>
                     </br>
                     <li>COMMANDS</li>
                     </br>
                     <li class="ml-2 line-multispace">deliver      delivers a message input by the user</li>
                     </ul>
                     `;
        let deliverFailed = `
                     <ul>
                     <li>FAILED</li>
                     </br>
                     <li>Incorrect usage: The deliver command requires a message. Type the message in single quotes following the deliver command.</li>
                     </ul>
                     `;
        let deliverHelp = `
                     <ul>
                     <li>COMMAND NAME</li>
                     </br>
                     <li class="ml-2 line-multispace">deliver      delivers a message input by the user</li>
                     </br>
                     <li>USAGE EXAMPLES</li>
                     </br>
                     <li class="ml-2">clim8 deliver -m 'your message'</li>
                     </br>
                     <li>FLAGS</li>
                     </br>
                     <li class="ml-2 line-multispace">-m      Message to be delivered (example 'this is my message')</li>
                     </ul>
                     `;
        let deliverRunning = `
                     <ul>
                     <li>Running...</li>
                     </ul>
                     `;
        let deliverSuccess = `
                     <ul>
                     <li>Success!</li>
                     </ul>
                     `;

        // user enters 'clim8' and sees greeting / introductory overview
        if(commandEntered === 'clim8' || 
           commandEntered === 'clim8 -h' || 
           commandEntered === 'clim8 --help') {
          document.getElementById("terminalHistory").appendChild(terminalResponseContainer);
          terminalResponseContainer.innerHTML = greeting;
        }

        // user runs 'clim8 deliver without any flags'
        else if(commandEntered === 'clim8 deliver') {
          document.getElementById("terminalHistory").appendChild(terminalResponseContainer);
          terminalResponseContainer.innerHTML = deliverFailed + deliverHelp;
        }

        // user sees help for 'clim8 deliver' command
        else if((commandEntered === 'clim8 deliver -h') || (commandEntered === 'clim8 deliver --help')) {
          document.getElementById("terminalHistory").appendChild(terminalResponseContainer);
          terminalResponseContainer.innerHTML = deliverHelp;
        }

        // user enters 'clim8 deliver -m [any message]' and sees that it is running
        else if(commandEntered.includes('clim8 deliver') && 
                commandEntered.includes('-m')) {
          document.getElementById("terminalHistory").appendChild(terminalResponseContainer);
          terminalResponseContainer.innerHTML = deliverRunning;
          document.getElementById("terminalInputContainer").style.display = "none"
          
          // user sees success message after waiting 3 seconds
          setTimeout(function(){
            document.getElementById("terminalHistory").appendChild(terminalRunningMessageContainer);
            terminalRunningMessageContainer.innerHTML = deliverSuccess;
            document.getElementById("terminalInputContainer").style.display = "flex"
            document.getElementById("terminalInput").focus();
          }, 2000);
        }

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

        return(commandEntered);
  };
};


let map = {}; 
onkeydown = onkeyup = function(e){
    e = e || event; 
    map[e.keyCode] = e.type == 'keydown';
    // user clears the terminal with CMD + k or CTRL + K
    if((map[91] && map[75])){ // CMD+K
      document.getElementById("terminalHistory").innerHTML = "";
    }
    else if (map[17] && map[75]) { // CTRL + K
      document.getElementById("terminalHistory").innerHTML = "";
    };
    // user presses up arrow key to print previous command
    if(map[38]){
      document.getElementById('terminalInput').value = commandEntered
    }
};

// click anywhere to re-focus the terminal input
document.body.addEventListener('click', focusTerminal); 
function focusTerminal() {
  document.getElementById("terminalInput").focus();
};
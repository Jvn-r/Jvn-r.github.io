const terminal = document.getElementById("terminal");
const output = document.getElementById("output");
const input = document.getElementById("cmd");
const cmdList = document.getElementById("cmd-list");

const commands = {
    help: {
        desc: "list available commands",
        run: (args) => {
            for (const [name, cmd] of Object.entries(commands)) {
                print(`${name}: ${cmd.desc}`);
            }
        },
    },
    clear: {
        desc: "clear the screen",
        run: (args) => {
            output.innerHTML = "";
        },
    },
};

for (const [name, cmd] of Object.entries(commands)) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${cmd.desc}`;
    li.addEventListener("click", () => {
        runCommand(name);
        input.value = "";
        input.focus();
    });
    cmdList.appendChild(li);
}

function print(text) {
    const line = document.createElement("div");
    line.textContent = text;          
    output.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;   
}

function printCommand(text) {
    const line = document.createElement("div");

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = "visitor@jvnr:~$ ";

    const command = document.createElement("span");
    command.textContent = text;

    line.appendChild(prompt);
    line.appendChild(command);
    output.appendChild(line);

    terminal.scrollTop = terminal.scrollHeight;
}

function runCommand(line) {
    printCommand(line);
    const parts = line.trim().split(/\s+/);
    const name = parts[0];
    const args = parts.slice(1);

    if (Object.hasOwn(commands, name)) {
        commands[name].run(args);
    } else {
        print(`command not found: ${name}`);
    }
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (input.value.trim() === "") return;
        runCommand(input.value.toLowerCase());
        input.value = "";
    }
});

terminal.addEventListener("click", () => {
    if (window.getSelection().toString() === "") {
        input.focus();
    }
});
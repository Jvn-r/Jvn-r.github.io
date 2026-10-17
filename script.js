const terminal = document.getElementById("terminal");
const output = document.getElementById("output");
const input = document.getElementById("cmd");
const cmdList = document.getElementById("cmd-list");

const ART = String.raw`
                                ,.=,,==. ,,_
                _ ,====, _    |I|   ||   |I  |
               |      ^^ |   ||_,===TT ==,,_ |
                |,==Y''Y==,,__| \L=_- '   +J/' 
                \|=_  ' -=#J/..-|=_-     =|
                |=_   -;-=' . .|=_-     =|----T--,
                |=/\  -|=_-. . |=_-/^\  =||-|-|::|____
                |=LJ  -|=_-. . |=_-|_| =||-|-|:::::::
                |=_   -|=_-_.  |=_-     =|-|-||:::::::
                |=_   -|=//^\. |=_-     =||-|-|:::::::
            ,   |/&_,_-|=||  | |=_-     =|-|-||:::::::
        ,--''8%,/    ',%||  | |=_-     =||-|-|%::::::
    ,---'_,888'  ,.'''''\-.,|,|/!,--,.&\|&\-,|&#:::::
    |;:;K\__,...;=\_____,=''           %%%&     %#,---
    |;::::::::::::|       \'.________+-------\   ''
    /8M%;:::;;:::::|                  |        '-------
`;

function printBoot() {
    const boot = document.createElement("div");
    boot.className = "boot";

    const art = document.createElement("pre");
    art.className = "boot-art";
    art.textContent = ART.trim() ? ART.replace(/^\n|\n$/g, "") : "";

    const info = document.createElement("div");
    const rows = [
        ["os", "jvnr-os (it's a website)"],
        ["name", "R Jeevan"],
        ["role", "AIML undergrad, DSATM"],
        ["grad", "2027"],
        ["focus", "linux internals, C, AI, ML"],
        ["projects", `${Object.keys(projects).length} (run: projects)`],
        ["contact", "run: contact"],
        ["art", "https://ascii.co.uk/art"]
    ];

    const title = document.createElement("div");
    title.textContent = "visitor@jvnr";
    info.append(title, "-------------");
    for (const [k, v] of rows) {
        const row = document.createElement("div");
        const key = document.createElement("span");
        key.className = "boot-key";
        key.textContent = k.padEnd(10);
        row.append(key, v);
        info.append(row);
    }

    boot.append(art, info);
    output.appendChild(boot);
    terminal.scrollTop = terminal.scrollHeight;
}

const projects = {
    serie: {
        title: "Serie",
        tagline: "a linux system observer and interpreter",
        stack: "C, Linux",
        details: ["    Serie is a linux system analysis tool, that hooks onto the process connector via netlink and tracks all the process events to create a compact proc struct that stores important meta data.", "    This metadata is logged, using a temporal and a frequency based signal, in an NDJSON file for future analysis, plans for future machine learning integration for anomaly detection"],
        link: "https://github.com/Jvn-r/serie",
    },
    chloe: {
        title: "Chloe",
        tagline: "custom windows shell with a Win32 UI",
        stack: "C, Windows",
        details: ["    Chloe is my custom shell, with a lexical tokenizer built from scratch to tokenize commands, since regular tokenization methods failed", "    Deployed on a simple Win32 UI along with a few functional in built commands like echo, pwd, cd, hello, ver, help, exit"],
        link: "https://github.com/Jvn-r/chloe",
    },
    phaea: {
        title: "Phaea",
        tagline: "windows process-file visualizer",
        stack: "JS, HTML, Python, BATCH file",
        details: ["    Phaea is a process-file graph style visualizer, utilizing event data from wtrace, an ETW based event tracing tool, i could parse each and every event happening on my windows machine", "    This parsed event is then fed into a HTML d3 graph engine, via websockets, which visualizes processes and files as nodes and connects them with an edge, representing relationship"],
        link: "https://github.com/Jvn-r/phaea",
    },
    ophea: {
        title: "Ophea",
        tagline: "fully automated cold outreach pipeline",
        stack: "JS",
        details: ["    Ophea is an automated pipeline of multiple third party APIs working towards an automated personalized cold outreach system that takes in a single domain as an input", "    The single domain (ex: Stripe.com) is used to gather similar domains, i enrich each domain by identifying their C-suite executives, and finally sending them a personalized cold outreach email."],
        link: "https://github.com/Jvn-r/ophea",
    },
    lkrs: {
        title: "Lecture Knowledge Retrieval System",
        tagline: "a multimodal RAG system to extract and query knowledge from a video",
        stack: "Python",
        details: ["    LKRS is my final year project, where my team has found a research gap to work on, a multimodal RAG system, which uses audio and visual data, to perform RAG. ", "    The hardest part was syncing the audio transcript and the video keyframe OCR, which was solved by using timestamp windows and a deduplication threshold to ensure the retrieved chunk was optimal for accurate RAG."],
        link: "https://github.com/Jvn-r/lkrs",
    },
    phos: {
        title: "Phos",
        tagline: "experimental CV project for construction ppe detection",
        stack: "Python",
        details: ["    Phos started off of a question, do i really need to use a DL model like YOLO for construction PPE detection, the main reason for the question was that PPE is very distinctive wrt color, so why not use classical CV to perform color matching.", "    That is how i built a simple OpenCV only system that used HSV color matching and body part segmentation to check whether the worker had their PPE kit on."],
        link: "https://github.com/Jvn-r/phos",
    },
    bible: {
        title: "Bible",
        tagline: "dynamic task scheduler, the `Meeting at 10pm` kinda tasks",
        stack: "Python, JS, CSS, HTML",
        details: ["    Bible is a task scheduler, unlike regular calendar type schedulers, we use a scheduling algorithm to weigh the importance of a task and allocate our available free time on a timetable","    FastAPI is the framework we use with Supabase as our database, along with an FFD(first fit decreasing) algorithm for the task scheduling"],
        link: "https://github.com/Jvn-r/bible",
    }
}

const commands = {
    help: {
        desc: "list available commands",
        run: (args) => {
            for (const [name, cmd] of Object.entries(commands)) {
                print(`${name}: ${cmd.desc}`);
            }
        },
    },
    contact: {
        desc: "find me here",
        run: (args) => {
            printLink("email:", "mailto:rjeevan1495@gmail.com", "rjeevan1495@gmail.com");
            printLink("github:", "https://github.com/Jvn-r", "https://github.com/Jvn-r");
            printLink("linkedin:", "https://www.linkedin.com/in/jeevan-r-5026b4354/", "https://www.linkedin.com/in/jeevan-r-5026b4354/");
        },
    },
    about: {
        desc: "i talk about myself",
        run: (args) => {
            print("     Halloo, I'm R Jeevan, an AIML undergrad.");
            print("     My interests lie in understanding how things work beneath the surface.");
            print("     My major project called Serie does exactly that, written completely in C, it acts as a monitoring tool for linux internals helping me get a closer look at actual process interactions and behaviours.");
            print("     Another project called Phaea does a similar job for Windows, focusing on visualization. Theres another project called Chloe where I... well i think im losing the track of an `about`, you can check out more of my projects by using the `projects` command.");
            print("     That aside my hobbies include playing games, reading, watching movies, sleeping etc, just normal human stuff... and drawing, but i am horrible at it");
            print("     Oki thats already a lot of text, and i dont think anyone has actually read it, BUT its the thought that counts, so Thank you for reading me yap and try out any command thats listed under the `help` command");
        },   
    },
    projects: {
        desc: "browse projects",
        run: (args) => {
            if(args.length === 0) {
                print("to get details on any of the below mentioned projects please run: `projects <project_name>`, Ex: projects serie");
                for (const [name, p] of Object.entries(projects)) {
                    print(`    ${name.padEnd(8)}: ${p.tagline}`);
                }
            }else {
                if (Object.hasOwn(projects, args[0])){
                    const key = args[0].toLowerCase();
                    const proj = projects[key];
                    print(`${proj.title} : ${proj.tagline}`);
                    print(`Stack : ${proj.stack}`)
                    print("Details :");
                    print(`${proj.details[0]}`);
                    print(`${proj.details[1]}`);
                    printLink("github link:", `${proj.link}`, `${proj.link}`);
                }else {
                    print("Please re check the project name");
                }
            }
        }
    },
    drawings: {
        desc: "my art (it's bad)",
        run: (args) => {
            print("SIKE, ive not implemented it yet");
        }
    },
    neofetch: {
        desc: "more data",
        run: (args) => {
            printBoot();
        }
    },
    clear: {
        desc: "clear the screen",
        run: (args) => {
            output.innerHTML = "";
        },
    },
    meow: {
        desc: "meow meooow",
        run: (args) => {
            const randomInt = Math.floor(Math.random() * 10);
            print(`me${"o".repeat(randomInt)}w`);
        }
    }
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

function printLink(label, url, text) {
    const line = document.createElement("div");
    line.append(label.padEnd(13));
    const a = document.createElement("a");
    a.href = url;
    a.textContent = text;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    line.append(a);
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

runCommand("neofetch");
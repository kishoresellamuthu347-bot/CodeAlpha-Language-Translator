/* =====================================
   Character Counter
===================================== */

const textInput =
    document.getElementById("text");

const counter =
    document.getElementById("counter");


textInput.addEventListener(
    "input",
    function () {

        const length =
            textInput.value.length;

        counter.innerText =
            length + " / 500 characters";

    }
);


/* =====================================
   Translation
===================================== */

async function translateText() {

    const text =
        document.getElementById("text").value;

    const source =
        document.getElementById("source").value;

    const target =
        document.getElementById("target").value;

    const result =
        document.getElementById("result");

    const button =
        document.getElementById("translateButton");


    /* Empty input */

    if (text.trim() === "") {

        result.innerText =
            "Please enter some text.";

        return;
    }


    /* Same language */

    if (source === target) {

        result.innerText = text;

        return;
    }


    /* Loading */

    result.innerText =
        "Translating...";

    button.innerText =
        "Translating...";

    button.disabled = true;


    try {

        const response =
            await fetch("/translate", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    text: text,

                    source: source,

                    target: target

                })

            });


        const data =
            await response.json();


        if (data.translation) {

            result.innerText =
                data.translation;

        }

        else {

            result.innerText =
                "Error: " +
                (data.error ||
                 "Translation failed.");

        }

    }


    catch (error) {

        console.error(error);

        result.innerText =
            "Unable to connect to the translation server.";

    }


    /* Restore button */

    button.innerText =
        "Translate";

    button.disabled = false;

}


/* =====================================
   Swap Languages
===================================== */

function swapLanguages() {

    const source =
        document.getElementById("source");

    const target =
        document.getElementById("target");

    const text =
        document.getElementById("text");

    const result =
        document.getElementById("result");


    /* Save current values */

    const oldSource =
        source.value;

    const oldTarget =
        target.value;


    /* Swap languages */

    source.value =
        oldTarget;

    target.value =
        oldSource;


    /* Swap text */

    if (
        result.innerText !==
        "Translation will appear here." &&

        result.innerText !==
        "Translating..." &&

        !result.innerText.startsWith("Error:")
    ) {

        const oldText =
            text.value;

        const oldTranslation =
            result.innerText;


        text.value =
            oldTranslation;

        result.innerText =
            oldText;

    }


    /* Update counter */

    counter.innerText =
        text.value.length +
        " / 500 characters";

}


/* =====================================
   Copy Translation
===================================== */

function copyTranslation() {

    const result =
        document.getElementById("result").innerText;


    if (
        result ===
        "Translation will appear here." ||

        result ===
        "Translating..." ||

        result.startsWith("Error:")
    ) {

        return;
    }


    navigator.clipboard
        .writeText(result)
        .then(function () {

            alert("Translation copied!");

        })
        .catch(function (error) {

            console.error(
                "Copy error:",
                error
            );

        });

}


/* =====================================
   Text To Speech
===================================== */

function speakTranslation() {

    const result =
        document.getElementById("result").innerText;


    if (
        result ===
        "Translation will appear here." ||

        result ===
        "Translating..." ||

        result.startsWith("Error:")
    ) {

        return;
    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(result);


    window.speechSynthesis.speak(speech);

}
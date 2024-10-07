let form = document.querySelector("form")
let output = document.querySelector(".result")
let searchword = document.querySelector(".search-box")
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    word(searchword.value)
})

word = async (searchword) => {
    output.innerHTML = "";
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchword}`)
        const data = await response.json();
        console.log(data);
        let definitions = data[0].meanings[0].definitions[0]
        output.style.display="block"
        output.innerHTML = `
    <h2><strong>${data[0].word}</strong></h2>
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p><strong> Meaning: </strong>${definitions.definition}</p>
    <p><strong> Example: </strong>${definitions.example === undefined ? "Not Found" :
                definitions.example}</p>
        <p><strong> Antonyms: </strong></p> 
    `
        if (definitions.antonyms.length === 0) {
            output.innerHTML += `<p>"Not Found"</p>`
        }
        else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                output.innerHTML += `<li>${definitions.antonyms[i]}</li>`
            }
        }

        
        // Access the audio link
        const audioLink = data[0]?.phonetics?.[0]?.audio;
        if (audioLink) {
            output.innerHTML += `<div class="audio"><audio controls>
                <source src="${audioLink}" type="audio/mp3">
            </audio></div>`;
        } else {
            output.innerHTML += `Audio not found`;
        }

        output.innerHTML += `<div class="readMore-btn"><a class="Read-more" href="${data[0].sourceUrls}" target="_blank"<span>Read more</span></div>`
        
    }

    catch (error) {
        console.log('Not Found')
        output.innerHTML += `<p><strong> Meaning: </strong>"Not Found"</p>`
      
    }
    // alert("word you entered"+searchword)
}

const $inputField = document.querySelector("[name=word");
const $form = document.querySelector(".madlibs-form");
const $submitButton = document.querySelector(".submit-word");
const $clearButton = document.querySelector(".reset-game");
const $container = document.querySelector(".word-container");

const $noun = [];
const $adj = [];
$noun[0] = document.querySelector(".noun-1");
$noun[1] = document.querySelector(".noun-2");
$noun[2] = document.querySelector(".noun-3");
$adj[0] = document.querySelector(".adj-1");
$adj[1] = document.querySelector(".adj-2");
const $adv1 = document.querySelector(".adv");

var nouns = [];
var adjs = [];
var adv = "";
var wordInput = null;
var partOfSpeech = null;

var counter = 0;
var randNum = Math.floor(Math.random()*3) + 1 // used to randomly select a story

function getInputFieldValue() {
	return $inputField.value.trim().replaceAll("<", "").replaceAll(">","");
}

function displayStory() {
	var story;
	if (randNum === 1) {
		story = `Jessie and her best friend Dave went to Disney World today! They saw a ${nouns[0]} in a show at the Magic Kingdom and ate a ${adjs[0]} feast for dinner. The next day I ran ${adv} to meet Mickey Mouse in his ${nouns[1]} and then that night I gazed at the 1000 ${adjs[1]}fireworks shooting from the ${nouns[2]}.`;
	} else if (randNum === 2) {
		story = `One day I went to the park with my ${nouns[0]}. It was very a cold and ${adjs[0]} day, but I wanted to see the ${nouns[1]}s crawling ${adv} across the grass. Suddenly, a group of ${nouns[2]} jumped out of the trees and I ran back to my ${adjs[1]} home.`;
	} else if (randNum === 3) {
		story = "blank"
	}
}

function formSumbitted(event) {
	event.preventDefault();
	var inputFieldValue = getInputFieldValue();

	/*
	// fetch data from Free Dictionary API (no key required)
	const url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${inputFieldValue}`;


	fetch(url)
		.then(response => response.json())
		.then(data => { 
			if (data[0].word === undefined) {
				alert("That's not a word!");
			} else {
				wordInput = data[0].word;
				partOfSpeech = data[0].meanings[0].partOfSpeech;

			}
		});
	*/

	// fetch data from Merriam-Webster Dictionary API (key required: obtained by registering & making an account at https://dictionaryapi.com/)
	
	const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${inputFieldValue}?key=${key}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			// Active code is for fetching Merriam-Webster API data 
			if (data[0].hwi === undefined) {
				alert("That's not a word!");
			} else {
				wordInput = data[0].hwi.hw;  
				partOfSpeech = data[0].fl;
				console.log(wordInput);
				console.log(partOfSpeech);
			}
		});


	if (inputFieldValue.length > 0 && wordInput != undefined) {
	counter += 1;
	$container.innerHTML = `
	<li data-target="${counter}">
		${inputFieldValue}
		<button data-target="${counter}">Delete Word</button>
	</li>`;

		if (partOfSpeech === "noun" || partOfSpeech === "adjective" || partOfSpeech === "adverb") {

		if (partOfSpeech === "noun" && nouns.length < 3) {
			nouns.push(inputFieldValue);
		} else if (partOfSpeech === "noun" && nouns.length === 3 ) {
			alert("You have already entered enough nouns!");
		} else if (partOfSpeech === "adjective" && adjs.length < 2) {
			adjs.push(inputFieldValue);
		} else if (partOfSpeech === "adjective" && adjs.length === 2) {
			alert("You have already entered enough adjectives!");
		} else if (partOfSpeech === "adverb" && adv == "") {
			adv = inputFieldValue;
			$adv1.innerHTML += inputFieldValue;
		} else if (partOfSpeech === "adverb" && adv != "") {
			alert("You have already entered an adverb.")
		}
		} else {
		alert("Improper word type. try again!");
		}

		if (nouns.length == 3 && adjs.length == 2 && adv != "") {

		for (var i = 0; i < 3; i++) {
			$noun[i].innerHTML += `${nouns[i]}`;
		} 
		for (var k = 0; k < 2; k++) {
				$adj[k].innerHTML += `${adjs[k]}`;
			} 

		displayStory();

		}

		story = "";
		$inputField.value = "";
		$submitButton.setAttribute("disabled", null);
	}
}

$form.addEventListener("submit", formSumbitted);

function resetGame(event) {
	event.preventDefault();
	$container.innerHTML = "";
}

$clearButton.addEventListener("click", resetGame);

function deleteItem(event) {
	const srcElement = event.srcElement;
	if(srcElement.nodeName === "BUTTON") {
		alert("Delete Word " + srcElement.dataset.target);
		document.querySelector(
			`li[data-target="${srcElement.dataset.target}"]`
		).outerHTML = "";
	}
}

$container.addEventListener("click", deleteItem);

function inputValueChanged() {
	var value = getInputFieldValue();
	if (value.length > 0) {
		$submitButton.removeAttribute("disabled");
	} else {
		$submitButton.setAttribute("disabled", null);
	}
}

$inputField.addEventListener("keyup", inputValueChanged);
const $inputField = document.querySelector("[name=word");
const $form = document.querySelector(".madlibs-form");
const $submitButton = document.querySelector(".submit-word");
const $clearButton = document.querySelector(".reset-game");
const $container = document.querySelector(".temp-container");
const $storyContainer = document.querySelector(".story-container");

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
var definition = null;

var randNum;

function setRandNum() {
	randNum = Math.floor(Math.random()*3) + 1 // used to randomly select a story
	console.log(randNum);
}

setRandNum();

function getInputFieldValue() {
	return $inputField.value.trim().replaceAll("<", "").replaceAll(">","");
}

function displayStory() {
	var story;
	if (randNum === 1) {
		story = `Jessie and her best friend Dave went to Disney World today! They saw a <strong>${nouns[0]}</strong> in a show at the Magic Kingdom and ate a <strong>${adjs[0]}</strong> feast for dinner. The next day I ran <strong>${adv}</strong> to meet Mickey Mouse in his <strong>${nouns[1]}</strong> and then that night I gazed at the 1000 <strong>${adjs[1]}</strong> fireworks shooting from the <strong>${nouns[2]}</strong>.`;
	} else if (randNum === 2) {
		story = `One day I went to the park with my <strong>${nouns[0]}</strong>. It was very a cold and <strong></strong>${adjs[0]} day, but I wanted to see the <strong></strong>${nouns[1]}s crawling <strong></strong>${adv} across the grass. Suddenly, a group of <strong></strong>${nouns[2]}s jumped out of the trees and I ran back to my <strong>${adjs[1]}</strong> home.`;
	} else if (randNum === 3) {
		story = `Yesterday Jamie and their friend Ann went to the zoo and saw the smallest <strong>${nouns[0]}</strong> they had ever seen! They ate a <strong></strong>${adjs[0]} picnic before <strong>${adv}</strong> being interrupted by <strong>${adjs[1]} ${nouns[1]}s</strong> and <strong>${nouns[2]}s</strong>.`;
	}
	$storyContainer.innerHTML += `<h3>Your random story: </h3> <p>${story}</p>` ;
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
			if (data[0].shortdef[0] === undefined) {
				alert("That's not a word!");
			} else {
				wordInput = data[0].hwi.hw;  
				partOfSpeech = data[0].fl;
				definition = data[0].shortdef[0];
			}
		});

	// conditions to validate user input
	if (inputFieldValue.length > 0 && wordInput != undefined) {

		if (partOfSpeech === "noun" || partOfSpeech === "adjective" || partOfSpeech === "adverb") {

			if (partOfSpeech === "noun" && nouns.length < 3) {
				nouns.push(inputFieldValue);
			} else if (partOfSpeech === "noun" && nouns.length === 3 ) {
				alert("You have already entered enough nouns!");
			} else if (partOfSpeech === "adjective" && adjs.length < 2) {
				adjs.push(inputFieldValue);
			} else if (partOfSpeech === "adjective" && adjs.length === 2) {
				alert("You already entered enough adjectives!");
			} else if (partOfSpeech === "adverb" && adv === "") {
				adv = inputFieldValue;
				$adv1.innerHTML += inputFieldValue + " " + definition;
			} else if (partOfSpeech === "adverb" && adv != "") {
				alert("You already entered an adverb.")
			}

		} else {
		alert("Improper word type. try again!");
		}

		if (nouns.length === 3 && adjs.length === 2 && adv != "") {

		for (var i = 0; i < 3; i++) {
			$noun[i].innerHTML += `${nouns[i]}, ${definition}`;
		} 
		for (var k = 0; k < 2; k++) {
				$adj[k].innerHTML += `${adjs[k]}, ${definition}`;
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
	setRandNum();
}

$clearButton.addEventListener("click", resetGame);

function inputValueChanged() {
	var value = getInputFieldValue();
	if (value.length > 0) {
		$submitButton.removeAttribute("disabled");
	} else {
		$submitButton.setAttribute("disabled", null);
	}
}

$inputField.addEventListener("keyup", inputValueChanged);
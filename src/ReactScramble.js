

var curLetterIndex = 0;

function globalShowWordsForCell(letterIndex)
{
	//console.log(letterIndex);

	curLetterIndex = letterIndex;

	var wordsObj = GAME.findCellWords(letterIndex);

//	React.render(<WordList letterIndex={letterIndex} items={wordsObj.words} wordPaths={wordsObj.wordPaths} />, document.getElementById('wordList'));

	globalUpdateLetterButtons(letterIndex, wordsObj);
}

function globalShowWord(letterIndex, word, wordPath)
{
	GAME.clearBoard();
	GAME.drawWordLineOverlay(letterIndex, word, wordPath);
}

// var LetterButtons = React.createClass({
//   render: function() {
//     var createButton = function(arrayElemValue, arrayElemIndex, origArray) {
//       return <button id={"WordButton_"+arrayElemValue} class="btn" onClick={globalShowWord(arrayElemIndex)}>{arrayElemValue}</button>;
//     };
//     //console.log(this.props.wordLetters);
//     return <div>{this.props.wordLetters.map(createButton)}</div>;
//   }
// });

var WordButton = React.createClass({
  render: function() {
  	var btnStyles = {background:this.props.btnColor};
    return <button id={this.props.id} className="wordButton" style={btnStyles} onClick={this.handleClick}>{this.props.word}</button>;
  },
  handleClick: function(event) {
    globalShowWord(curLetterIndex, this.props.word, this.props.wordPath);
  }
});

// letterIndex={this.props.letterIndex} word={arrayElemValue} wordIndex={arrayElemIndex} wordPath={this.props.wordsObj.wordPaths[arrayElemIndex]}

var WordButtons = React.createClass({
  render: function() {
    var createButton = function(arrayElemValue, arrayElemIndex, origArray) {
       var colorStyle = "#fff";
       return <WordButton id={"WordButton_"+arrayElemValue.word} btnColor={colorStyle} 
       		word={arrayElemValue.word} wordIndex={arrayElemIndex} wordPath={arrayElemValue.wordPath}
       		class="btn" onClick={this.handleClick}>{arrayElemValue.word}
       		</WordButton>;
    };

    if (this.props.wordPairs.length > 0)
    	return (<div>{this.props.wordPairs.map(createButton)}</div>);
    else
    	return (<span>No words for that letter</span>);
  }
});

// var WordButtons = React.createClass({
//   render: function() {
//     var createButton = function(arrayElemValue, arrayElemIndex, origArray) {
//        var colorStyle = (arrayElemIndex == curLetterIndex)? "#0d0" : "#fff";
//        return <WordButton id={"WordButton_"+arrayElemValue} btnColor={colorStyle} word={arrayElemValue} wordIndex={arrayElemIndex} 
//        		class="btn" onClick={this.handleClick}>{arrayElemValue}
//        		</WordButton>;
//     };

//     return (<div>{this.props.words.map(createButton)}</div>);
//   }
// });

function globalUpdateLetterButtons(letterIndex, wordsObj)
{
	var wordPairs = [];
	for (i = 0; i < wordsObj.words.length; i++)
	{
		wordPairs.push({word: wordsObj.words[i], wordPath: wordsObj.wordPaths[i]});
	}
	wordPairs.sort(function(a,b) {return (GAME.returnWord(a.word) > GAME.returnWord(b.word))? -1 : 1;})

	React.render(<WordButtons letterIndex={letterIndex} wordPairs={wordPairs} />, document.getElementById('wordButtons'));

	if (wordPairs.length > 0)
		globalShowWord(letterIndex, wordPairs[0].word, wordPairs[0].wordPath);
}

var ScrambleCanvas = React.createClass({
	render: function() {
		return <canvas id="gameBoardCanvas" width="200" height="200" onClick={this.handleClick}/>;
	},
  	handleClick: function(e) {
		var cx = Math.floor((e.clientX - e.target.offsetLeft) / GAME.BoardCellSize);
		var cy = Math.floor((e.clientY - e.target.offsetTop) / GAME.BoardCellSize);
		var cellNum = cy*GAME.BoardSize+cx;

		globalShowWordsForCell(cellNum);
  	}

});


React.render(<ScrambleCanvas/>, document.getElementById('gameBoardCanvasDiv'));

GAME.setup();



var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');


if(window.innerWidth<=window.innerHeight){
	canvas.width = window.innerWidth-20; 
	canvas.height = window.innerWidth-20;
} else {
	canvas.width = window.innerHeight-20;
	canvas.height = window.innerHeight-20;
}

function copyArray(array){
	var outputArray = [];

	for(var i = 0;i<array.length;i++){
		outputArray.push(array[i]);
	}
	return outputArray;}
function simulateMove(array, target, destination){
	array[destination] = array[target];
	array[target] = ' ';}
function checkBoardForCheck(board, checkingForWhiteCheck){
	if(checkingForWhiteCheck==true){
		pieces = board.whitePieces;
	} else {
		pieces = board.blackPieces;
	}
	for(var i = 0; i<pieces.length; i++){
		if(pieces[i].type == 'king'){
			var kingIndex = pieces[i].boardIndex;
		}
	}
	moves = board.getAllMoves(!checkingForWhiteCheck);
	for(var i = 0; i<moves.length; i++){
		if(moves[i][1]==kingIndex){
			return [true, kingIndex];
		}
	}
	return [false,];}
function checkForCheckmate(board, checkingIfWhiteLost){
	var moves = board.getAllMoves(checkingIfWhiteLost);
	if(moves.length==0){
		return true;
	} else {
		return false;
	}}
function isUppercase(letter){
	upLetter = letter.toUpperCase();
	if(letter==upLetter){
		return true;
	} else {
		return false;
	}}
function findPieceObjAtIndex(index, board){
	if(board.board[index]=='0' || board.board[index]==' '){
		return null;
	}
	for(var i = 0;i<board.pieces.length;i++){
		if(board.pieces[i].boardIndex == index){
			return board.pieces[i];
		}
	}}
function arrayToPos(input, reverse=false){
	if(reverse==true){
		var index = (1+input[1])*10+input[0];
		return index;
	} else {
		var x = input%10;;
		var y = Math.floor(input/10)-1;
		return [x, y];
	}}
function arrayIndexToCoordinates(input, board, reverse=false){
	if(reverse==true){
		var x = Math.floor(input[0]/board.squareSize+1);
		var y = Math.floor(input[1]/board.squareSize+1);
		index = arrayToPos([x, y], true);
		return index;
	} else {
		var pos = arrayToPos(input);
		var x = (pos[0]-1)*board.squareSize;
		var y = (pos[1]-1)*board.squareSize
		return [x, y];
	}}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;}
function clickHappened(e) {
	e.preventDefault();
	var rect = canvas.getBoundingClientRect();
	boardIndex = arrayIndexToCoordinates([e.clientX-rect.left, e.clientY-rect.top], board, true);
	

	if(board.currentPieceSelected!=null){
		for(var i=0;i<board.currentPieceMoves.length;i++){
			if(boardIndex==board.currentPieceMoves[i]){
				board.checkSpaces = [];
				board.move(board.currentPieceSelected, boardIndex)
				board.currentPieceSelected=null;
				board.currentPieceMoves=null;
				return 0;
			}

		}
	}

	if(isUppercase(board.board[boardIndex])!=board.isWhitesTurn){
		return 0;
	}

	var piece = findPieceObjAtIndex(boardIndex, board);
	if(piece==null){
		type = '';
		board.currentPieceSelected = null;
		board.currentPieceMoves = null;
		board.draw();
	} else {
		type = piece.type;
	}
	if(type!=''){
		
		moves = piece.getMoves(boardIndex, board);
		if(moves.length == 0){
			_moves = [boardIndex];
		} else {
			_moves = moves.concat([boardIndex]);
		}
		board.draw(_moves);
		board.currentPieceSelected = boardIndex;
		board.currentPieceMoves = moves;
	}

	console.log(boardIndex, type);}
canvas.addEventListener('mousedown', clickHappened);
function eliminateCheckMoves(board, piece, pieceIndex, possibleMoves){
	if(board.isWhitesTurn==piece.isWhiteTeam){
		var maybePossibleMoves = possibleMoves;
		possibleMoves = [];
		for(var z = 0; z<maybePossibleMoves.length; z++){
			tempBoard = copyArray(board.board);
			simulateMove(tempBoard, pieceIndex, maybePossibleMoves[z]);
			tempBoard = new Board(tempBoard, false);
			tempBoard.draw();
			if(checkBoardForCheck(tempBoard, piece.isWhiteTeam)[0]==false){
				possibleMoves.push(maybePossibleMoves[z]);
			}
		}
	}
	return possibleMoves;}
function kingMoves(index, board){
	piece = findPieceObjAtIndex(index, board);
	pieceIndex = piece.boardIndex;
	moves = [-1, -11, -10, -9, 1, 11, 10, 9];
	possibleMoves = [];
	for(var i = 0; i<moves.length;i++){
		if(board.board[pieceIndex+moves[i]]!='0'){
			if(board.board[pieceIndex+moves[i]]==' '){
				possibleMoves.push(pieceIndex+moves[i]);
			} else {
				if(isUppercase(board.board[pieceIndex+moves[i]])!=isUppercase(board.board[pieceIndex])){
					possibleMoves.push(pieceIndex+moves[i]);
				}
			}
		}
	}
	possibleMoves = eliminateCheckMoves(board, piece, pieceIndex, possibleMoves);

	return possibleMoves;}
function queenMoves(index, board){
	piece = findPieceObjAtIndex(index, board);
	pieceIndex = piece.boardIndex;
	moves = [-1, -11, -10, -9, 1, 11, 10, 9];
	possibleMoves = [];

	for(var i = 0; i<moves.length;i++){
		for(var j = 1; j<=8; j++){
			if(board.board[pieceIndex+(moves[i]*j)]==' '){
				possibleMoves.push(pieceIndex+(moves[i]*j));
			} else if(isUppercase(board.board[pieceIndex+(moves[i]*j)])!=isUppercase(board.board[pieceIndex])&&board.board[pieceIndex+(moves[i]*j)]!='0'){
				possibleMoves.push(pieceIndex+(moves[i]*j));
				break;
			} else {
				break;
			}
		}
	}
	possibleMoves = eliminateCheckMoves(board, piece, pieceIndex, possibleMoves);

	return possibleMoves;}
function bishopMoves(index, board){
	piece = findPieceObjAtIndex(index, board);
	pieceIndex = piece.boardIndex;
	moves = [-11, -9, 11, 9];
	possibleMoves = [];

	for(var i = 0; i<moves.length;i++){
		for(var j = 1; j<=8; j++){
			if(board.board[pieceIndex+(moves[i]*j)]==' '){
				possibleMoves.push(pieceIndex+(moves[i]*j));
			} else if(isUppercase(board.board[pieceIndex+(moves[i]*j)])!=isUppercase(board.board[pieceIndex])&&board.board[pieceIndex+(moves[i]*j)]!='0'){
				possibleMoves.push(pieceIndex+(moves[i]*j));
				break;
			} else {
				break;
			}
		}
	}
	possibleMoves = eliminateCheckMoves(board, piece, pieceIndex, possibleMoves);

	return possibleMoves;}
function rookMoves(index, board){
	piece = findPieceObjAtIndex(index, board);
	pieceIndex = piece.boardIndex;
	moves = [-10, -1, 10, 1];
	possibleMoves = [];

	for(var i = 0; i<moves.length;i++){
		for(var j = 1; j<=8; j++){
			if(board.board[pieceIndex+(moves[i]*j)]==' '){
				possibleMoves.push(pieceIndex+(moves[i]*j));
			} else if(isUppercase(board.board[pieceIndex+(moves[i]*j)])!=isUppercase(board.board[pieceIndex])&&board.board[pieceIndex+(moves[i]*j)]!='0'){
				possibleMoves.push(pieceIndex+(moves[i]*j));
				break;
			} else {
				break;
			}
		}
	}
	possibleMoves = eliminateCheckMoves(board, piece, pieceIndex, possibleMoves);
	
	return possibleMoves;}
function knightMoves(index, board){
	piece = findPieceObjAtIndex(index, board);
	pieceIndex = piece.boardIndex;
	moves = [-12, -21, -19, -8, 12, 21, 19, 8];
	possibleMoves = [];
	for(var i = 0; i<moves.length;i++){
		if(board.board[pieceIndex+moves[i]]!='0'){
			if(board.board[pieceIndex+moves[i]]==' '){
				possibleMoves.push(pieceIndex+moves[i]);
			} else {
				if(isUppercase(board.board[pieceIndex+moves[i]])!=isUppercase(board.board[pieceIndex])){
					possibleMoves.push(pieceIndex+moves[i]);
				}
			}
		}
	}
	possibleMoves = eliminateCheckMoves(board, piece, pieceIndex, possibleMoves);

	return possibleMoves;}
function pawnMoves(index, board){
	piece = findPieceObjAtIndex(index, board);
	pieceIndex = piece.boardIndex;
	possibleMoves = [];

	if(isUppercase(board.board[pieceIndex])==true){
		multiple = -1;
		startRow = 7;
		opposingTeam = false;
	} else {
		multiple = 1;
		startRow = 2;
		opposingTeam = true;
	}

	if(board.board[pieceIndex+(10*multiple)]==' '){
		possibleMoves.push(pieceIndex+(10*multiple));
		if(board.board[pieceIndex+(20*multiple)]==' '&&arrayToPos(pieceIndex)[1]==startRow){
			possibleMoves.push(pieceIndex+(20*multiple));
		}
	}

	if(board.board[pieceIndex+(9*multiple)]!=' '&&isUppercase(board.board[pieceIndex+(9*multiple)])==opposingTeam&&board.board[pieceIndex+(9*multiple)]!='0'){
		possibleMoves.push(pieceIndex+(9*multiple));
	}
	if(board.board[pieceIndex+(11*multiple)]!=' '&&isUppercase(board.board[pieceIndex+(11*multiple)])==opposingTeam&&board.board[pieceIndex+(11*multiple)]!='0'){
		possibleMoves.push(pieceIndex+(11*multiple));
	}

	
	possibleMoves = eliminateCheckMoves(board, piece, pieceIndex, possibleMoves);
	
	return possibleMoves;}


class Piece {
	//TYPES: K - King, Q - Queen, B - Bishop, N - Knight, R - Rook, P - Pawn
	//UPPERCASE is white, lowercase is black
	constructor(type, location, board){
		this.boardIndex = location;
		var pos = arrayIndexToCoordinates(location, board);
		this.x = pos[0];this.y = pos[1];
		if (isUppercase(type)==true){
			this.team = 'white';
			this.isWhiteTeam = true;
		} else {
			this.team = 'black';
			this.isWhiteTeam = false;
		}

		if(type.toUpperCase()=='K'){
			this.type = 'king';
			this.getMoves = kingMoves;
		} else if(type.toUpperCase()=='Q'){
			this.type = 'queen';
			this.getMoves = queenMoves;
		} else if(type.toUpperCase()=='B'){
			this.type = 'bishop';
			this.getMoves = bishopMoves;
		} else if(type.toUpperCase()=='N'){
			this.type = 'knight';
			this.getMoves = knightMoves;
		} else if(type.toUpperCase()=='R'){
			this.type = 'rook';
			this.getMoves = rookMoves;
		} else if(type.toUpperCase()=='P'){
			this.type = 'pawn';
			this.getMoves = pawnMoves;
		}
		if(board.physical==true){
			this.image = document.getElementById(this.team+'_'+this.type)
			ctx.drawImage(this.image, this.x, this.y, board.squareSize, board.squareSize);
		}
	}}
class Board {
	constructor(givenBoard=null, physical=true){

		this.pieces = [];
		this.whitePieces = [];
		this.blackPieces = [];
		this.checkSpaces = [];
		this.physical = physical;
		this.isWhitesTurn = true;
		this.whosInCheck = null; //true is white, false is black, null is nobody

		this.currentPieceSelected = null;
		this.currentPieceMoves = null;

		this.aiMoveIndex = 0;
		this.preprogrammedMoves = [[35, 55], [24, 68]];

		if(givenBoard==null){
			this.board = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
						  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
						  '0', 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', '0',
						  '0', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', '0',
						  '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0',
						  '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0',
						  '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0',
						  '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0',
						  '0', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', '0',
						  '0', 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R', '0',
						  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
						  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',]
		} else {
			this.board = copyArray(givenBoard);
		}
		if(physical==true){this.draw();}
	}
	drawBackground(yellowSquares=[], redSquares=[]){
		ctx.fillStyle = 'darkgreen';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'white';

		this.squareSize = canvas.width/8;

		redSquares = redSquares.concat(this.checkSpaces);

		var x=0;
		var y=0;
		var alternate = true;
		while(x<canvas.width){
			while(y<canvas.width){
				ctx.fillRect(x, y, this.squareSize, this.squareSize);
				y+=2*this.squareSize;
			}

			if(alternate==false){
				var offset = 0;
				alternate = true;
			} else {
				var offset = this.squareSize;
				alternate = false;
			}

			y=offset;
			x+=this.squareSize;
		}

		for(var i = 0;i<yellowSquares.length;i++){
			var coords = arrayIndexToCoordinates(yellowSquares[i], this);
			ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
			ctx.fillRect(coords[0], coords[1], this.squareSize, this.squareSize)
		}
		for(var i = 0;i<redSquares.length;i++){
			var coords = arrayIndexToCoordinates(redSquares[i], this);
			ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
			ctx.fillRect(coords[0], coords[1], this.squareSize, this.squareSize)
		}

		//THIS IS CODE FOR NUMBERS - THEY LOOKED WEIRD SO I REMOVED EM
		/*ctx.font = this.squareSize/3+'px Arial';
		var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		var numbersX = this.squareSize/20;
		var numbersY = this.squareSize/3;
		for(var n=8;n>0;n--){
			ctx.fillText(n+'', numbersX, numbersY);
			ctx.strokeText(n+'', numbersX, numbersY);
			numbersY+=this.squareSize;
		}
		var lettersX = this.squareSize/3;
		var lettersY = canvas.height - (this.squareSize/20);
		for(var m=0;m<8;m++){
			ctx.fillText(letters[m], lettersX, lettersY);
			ctx.strokeText(letters[m], lettersX, lettersY);

			lettersX+=this.squareSize;
		}*/
	}
	draw(yellowSquares=[], redSquares=[]){
		if(this.physical==true){
			this.drawBackground(yellowSquares, redSquares);
		}
		this.pieces = [];
		this.whitePieces = [];
		this.blackPieces = [];
		for(var i=0;i<this.board.length;i++){
			if(this.board[i]=='0'||this.board[i]==' '){continue;}
			var piece = new Piece(this.board[i], i, this);
			this.pieces.push(piece);
			if(isUppercase(this.board[i])==true){
				this.whitePieces.push(piece);
			} else {
				this.blackPieces.push(piece);
			}
		}
	}
	move(targetIndex, destinationIndex){
		this.board[destinationIndex]=this.board[targetIndex];
		this.board[targetIndex]=' ';
		this.isWhitesTurn = !this.isWhitesTurn;
		this.draw();
		var checkSquares=[];
		var isCheck = checkBoardForCheck(this, this.isWhitesTurn)
		if(isCheck[0]==true){
			this.whosInCheck = this.isWhitesTurn;
			checkSquares = [isCheck[1]];
			var isCheckmate = checkForCheckmate(this, this.isWhitesTurn);
			if(this.isWhitesTurn==true){
				var whoWon ='Black';
			} else {
				var whoWon = 'White';
			}
			if(isCheckmate==true){
				this.draw([], checkSquares);
				this.checkSpaces = checkSquares;
				setTimeout(function(){window.alert('Checkmate! '+whoWon+' won!\nReload the page to restart.')}, 100);
			}
			this.checkSpaces = checkSquares;
			this.draw([], checkSquares);
		} else {
			this.checkSpaces = [];
		}
		/*if(this.isWhitesTurn == false && this.whosInCheck!=false){
			var moves = this.getAllMoves(false);
			var i = getRandomInt(0, moves.length-1);

			this.move(moves[i][0], moves[i][1]);

			// var moves = this.preprogrammedMoves;
			// this.move(moves[this.aiMoveIndex][0], moves[this.aiMoveIndex][1])
			// this.aiMoveIndex++;
		}*/
	}
	getAllMoves(teamIsWhite){
		var allPossibleMoves = [];
		if(teamIsWhite==true){
			var pieces = this.whitePieces; 
		} else {
			var pieces = this.blackPieces;
		}

		for(var i=0;i<pieces.length;i++){
			var moves = pieces[i].getMoves(pieces[i].boardIndex, this);
			for(var j=0;j<moves.length;j++){
				allPossibleMoves.push([pieces[i].boardIndex, moves[j]])
			}
		}

		return allPossibleMoves;
	}
}

board = new Board();
board2 = new Board();
var questionsArray=[];

function questions (question,options,answer){
    this.question=question,
    this.options=options,
    this.answer=answer
    this.status=Boolean
}
var q1 =new questions("I am not ____ this film.",["enjoying","liking","happy","love"],"enjoying")
questionsArray.push(q1)
var q2 =new questions("I am seeing her___three o’clock",["in","on","at","within"],"at")
questionsArray.push(q2)
var q3 =new questions("She___goodbye",["told","spoke","said","waved"],"said")
questionsArray.push(q3)
var q4 =new questions("You___so happy today!",["looks","seem","was","be"],"seem")
questionsArray.push(q4)
var q5 =new questions("I ___ what she’s saying",["am not understand","can't understand","has not understanding","None"],"can't understand")
questionsArray.push(q5)
////////////// make the question randomly generated /////////
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
      return array;
  }
   
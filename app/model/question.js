function QuestionSet(){
    this.list = []
}
QuestionSet.prototype.addQuestion = function(q){
    this.list.push(q);
};
module.exports = QuestionSet;
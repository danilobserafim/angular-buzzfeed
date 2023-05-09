import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = ""
  questions:any
  questionSelected: any

  answres:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor(){}
  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }
  playerChoose(option:string){
    this.answres.push(option)
    this.nextStap()
    
  }
  async nextStap(){
    this.questionIndex += 1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answres)
      this.finished = true

      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      console.log(this.answres);
      

    }
  }
  async checkResult(answers:any[]){
    const result = answers.reduce((previous: string, current: string, i: number, arr: string[])=>{
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current ).length  
      ) {
        return previous
      }else{
        return current
      }
    })
    return result
  }
  reset(){
    this.finished = false
    this.questionIndex = 0

    this.questionSelected = this.questions[this.questionIndex]
    this.questionMaxIndex = this.questions.length
  }
}

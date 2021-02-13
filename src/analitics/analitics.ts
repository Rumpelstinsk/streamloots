/* eslint-disable no-console */

export class Analitics {
  static saveClick(buttonId: string):void {
    console.log('Analitics 1', `button ${buttonId} clicked`);
  }

  static saveUserCards(numberOfCards: number):void {
    console.log('Analitics 2', `user [user-identification] has ${numberOfCards} cards`);
  }
}
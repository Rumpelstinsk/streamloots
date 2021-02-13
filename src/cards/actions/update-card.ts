import { Card } from '../../repositories';

export class UpdateCard{
  static do(card:Card):Promise<boolean> {
    // Here we will do all the required operations to validate and save the card
    // However the test task indicates that is no need to implement this method
    // The class is created just to show where it gets called
    return Promise.resolve(true);
  }
}
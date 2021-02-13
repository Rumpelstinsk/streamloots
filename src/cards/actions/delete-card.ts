export class DeleteCard{
  static do(id:string):Promise<boolean> {
    // Here we will do all the required operations to validate the deletion
    // and deleting the card by calling the appropiate method on repository
    // However the test task indicates that is no need to implement this method
    // The class is created just to show where it gets called
    return Promise.resolve(true);
  }
}
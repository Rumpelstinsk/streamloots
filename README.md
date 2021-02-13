# Streamloots

## Folder structure
The used folder structure is not better nor worse than others, it is simply one I like to use. Maybe it is a bit overhead for this exercise.

The first level folder, splits files by functionality or area. In next subsections there are some comments about it.

Also, exporting elements beetwen areas, is done through a `index.ts` file. Apart from the fact that it is much comfortable to use shorter routes while importing, it gives us a quick view of the main artefacts and how the module is exposed to others. Due to test suits sometimes need to mock an abstractions, test suits are the only files allowed to import files ignoring `index.ts` files.

### Store
This folder contains all redux logic. It has:

- One folder to type each different state in the store
- Hook folder: It contains some custom Hooks to be consumed in components, both to obtain information from the store and for dispatch update actions. This avoids having multiple unrelated and contextless dispatches and typing around code, and in addition, I think it is more semantic too.
- Store file: This contains the type for the store and the logic for combine reducers


### Repositories
This folder contains all the logic to retrieve and preserve data. It is similar to `Data` level in a clasic layered programming aproach. It has:
- Dto Folder: This contains the interfaces/types expected to be retrieved from an external API.
- api-client: This abstraction manage the logic to perform fetch actions. Also is the one in charge for inserting authentication headers and managing fetch errors
- Repositories files: These abstractions manage the logic to communicate with a third party API for example: merging data retrieved for multiple endpoints, stringifying the data before posting it, etc...

### Actions
This folder can be found on multiples areas. The files in these folders are the ones in charge to process all the data retrieved from repositories, before exposing it to the components. It is similar to `Bussines` level in a clasic layered programming approach.

### Components
This is folder can be found on multiples areas. The files in these folders are the ones in charge to show information to the user. They cannot contain any kind of logic nor interact with actions or the redux store. When they contains subfolders is due a complex component that is split in a bunch of smaller components, that are not intended to be used outside the main component, who is the only one exposed to others.

## Testing approach
Due to the mocks used on testing, this solution should be completed with some acceptance/e2e tests using Cypress for example. However, I think the proposed exercise is not intended to focus this part, so I have ommited these tests. Sorry if I am wrong and you also would have liked to see them too. Also, it would have been nice to put the app inside a docker image, to be easier to run in conjuntion with the test suite.

## Securizing API Client
In this approach, I could directly load the JSON who contains the card sample in an asnchronous way, however I prefer to consume the data from github. In a real situation, consuming user cards would has any kind of server filtering. Also, this api should provided only the user's cards, so it will need some kind of authorization. So, this approach prettends to show where I will place al that parts in a real problem, and also is more similar to a real situation.
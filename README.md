# Utify

Utify is an application developed by [georgejacobt](https://github.com/georgejacobt). It implements two API changes (see details below) that I use as a use-case to evaluate the evolvable-by-design approach that I created.

In this repository, the evolvable-by-design approach is implemented. Other projects are used as use cases, see the [evolvable-by-design organization](https://github.com/evolvable-by-design/).

### Repositories

- Original repository: [georgejacobt/utify](https://github.com/georgejacobt/utify)
- [Fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/utify)

**Amount of changes:** 2

**Types of changes:** 
* Add parameter (n°1)

**Commits with the changes:**

* Add parameter [4f64b31](https://github.com/georgejacobt/utify/commit/4f64b31930a53e96c1ad67625ce28e99b9feae35)
* Add parameter [9694469](https://github.com/georgejacobt/utify/commit/9694469f3f6d79ac985be39c01a0cb0305f9932c) -> this change is not supported by the evolvable-by-design approach because the design decision is to add a new functionality to the frontend. This point is already discussed in the article presenting the approach. Yet, to show that the approach would be able to automatically manage the addition of new parameters, the addition of the `tag` parameter in this commit will be handled by pivo without passing on frontend changes.

**Description of the work done:**

1. Fork the project [here](https://github.com/evolvable-by-design/utify)
2. Add the missing configuration to use the Youtube API
3. Create an evolvable-by-design branch from the commit before the one introducing the first evolution ([see commit](https://github.com/evolvable-by-design/utify/commit/98dc7cb42fc4257a64f6eb857720485ea3008440))
4. Document the API and serve the documentation from the `GET /api/documentation` endpoint ([see commit](https://github.com/evolvable-by-design/utify/commit/c0e739f44bf56ec42acc8c1d095c34d91b415184))
5. Standardize authentication header and set pivo authentication ([see commit](https://github.com/evolvable-by-design/utify/commit/0c02ce75e155eedc55713fac7057aead686bab2a)) (see problem encountered 1 below)
5. Implement the evolvable-by-design approach [in a single commit](https://github.com/evolvable-by-design/utify/commit/65c452634aaad11c9f78e9db13cf640f28dab135)
6. Replay the API evolution from commit [4f64b31](https://github.com/georgejacobt/utify/commit/4f64b31930a53e96c1ad67625ce28e99b9feae35) and make the changes on the server to make the evolvable-by-design approach work
7. Verify that the client code does not need to be modified in order to continue working -> **SUCCESS**
8. Apply all other changes of the commit and the next commits until the next API evolution, which includes commits 4f64b31, not 16c56ae because all the changes all already on master, 76c0646, 0ef0fd9, 195d09b, 4d29a91, a744998, c48600e, 94c7f03, 05aa8af, 8341a07, ee25225, 6b5835a, e2f1a17, 49c2b17, a13122f, c58cbe2
9. Add the operation that will evolve into the documentation ([see commit 5ba4f62](https://github.com/evolvable-by-design/utify/commit/5ba4f627d78f603d7e35add2cfb08ccdf57422ba)).
10. Implement the evolvable-by-design approach for the operation concerned by the change of commit 9694469. [See commit e379958](https://github.com/evolvable-by-design/utify/commit/e3799586c5da6949e68969fe09c950dc16d47bad) -> this change is not supported by the evolvable-by-design approach because the design decision is to add a new functionality to the frontend. This point is already discussed in the article presenting the approach. Yet, to show that the approach would be able to automatically manage the addition of new parameters, the addition of the `tag` parameter in this commit will be handled by pivo without passing the frontend changes.
11. Replay the API evolution from commit [9694469](https://github.com/georgejacobt/utify/commit/9694469f3f6d79ac985be39c01a0cb0305f9932c) ([see commit](https://github.com/evolvable-by-design/utify/commit/23e29d105d322abaa80cd8572ad9ff6ec4ce5a9f))
12. Verify that the client code does not need to be modified in order to continue working -> **SUCCESS**
13. Apply frontend changes from commit 9694469 ([see commit](https://github.com/evolvable-by-design/utify/commit/0275324c9e544263dfd54b1300fc20c6e4e7be49))

### Report

- How many evolutions? ➜ 2
- Types of evolutions ➜ n°1
- One or several commits? ➜ one commit per change (frontend and backend at the same time)
- How many lines per commit for the original evolution? ➜ Change 1: 7, change 2: 2
- How many lines of code to implement the approach on the frontend? ➜ Change 1: 57, change 2: 18
- One or several developers ➜ 1
- If tests, broken? ➜ no tests
- Covered or not covered? partially covered

### How to test the evolution

1. Clone the [repository](https://github.com/evolvable-by-design/utify)
2. Run `npm install`
3. Create google youtube API credentials and create `config.js` file based on `config.example.js` and a `client/src/components/config.json` based on `client/src/components/config/example.json`
4. Go back to the commit before the evolution `git checkout before-evolution-1`
5. Start the server `yarn start`
6. Login and then make a search
7. Stop the server `ctrl + c` in the bash session
8. Move to the server commit implementing the evolution `git checkout after-evolution-1`
9. Start the server back `yarn start`
10. Refresh the frontend and do the same thing as before
11. Stop the server `ctrl + c` in the bash session
12. Go to the commit before the evolution 2 `git checkout before-evolution-2`
13. Reinstall dependencies `npm install`
14. Start the server `yarn start`
15. Go to the `/members` route on the frontend
16. Stop the server `ctrl + c` in the bash session
17. Move to the server commit implementing the second evolution `git checkout after-evolution-2`
18. Start the server back `yarn start`
19. Refresh the frontend and do the same thing as before

### Problems encountered

Problem 1

Impossible to manage the evolution of [4f64b31](https://github.com/georgejacobt/utify/commit/4f64b31930a53e96c1ad67625ce28e99b9feae35). The evolution is the addition of a `userid` parameter to the API endpoint `/api/search`. This parameter is used to identify the user making the request because no standard authentication mechanism is used here. Hence, because the mechanism is not standard, the problem can be seen with 2 different angles.

First, it can be considered that because the authentication mechanism is not standard, it has not been possible to implement it in Pivo. Thus, the authentication can not be performed automatically and the generated request will fail. Yet, this intepreation is limited. While it is true for this very use case, a more general interpretation is possible and is detailed in the next paragraph.

Second, the added parameter is an example of a parameter that the user can not know. Hence, it should be provided by the backend, either directly into the documentation, or within hypermedia controls. Yet in this project this is not possible because, to provide this information in the documentation or in hypermedia controls, the user context must be known. Here, this is not possible because the parameter is the element enbaling to retrive the user context.

To overcome this issue, I implemented a standard authentication mechanism into the project using the AuthenticationService offered in Pivo.

### Comments

* Applying all the commits between the two evolutions without the need to modify it proved that the approach can easily be applied on small areas of an app, not on the whole app without impacting the rest. Thus, a progressive migration, or a limited usage can be considered.

## Original README

# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
yarn install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
yarn start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

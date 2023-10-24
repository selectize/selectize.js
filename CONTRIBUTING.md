# Contributing to Selectize

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
>
> - Star the project
> - Sponsor the project and/or individual contributors
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Improving The Documentation](#improving-the-documentation)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by the
[Selectize Code of Conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior
to the [maintainers](selectize@risadams.com).

## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation](https://selectize.dev).

Before you ask a question, it is best to search for existing [Issues](https://github.com/fabienwnklr/selectize.js/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/fabienwnklr/selectize.js/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice
>
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](https://selectize.dev). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/fabienwnklr/selectize.js/issues?q=label%3Abug).
- Make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
- Possibly your input and the output
- Can you reliably reproduce the issue? And can you also reproduce it with older versions?

#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to .

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/fabienwnklr/selectize.js/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the _reproduction steps_ that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team can reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Selectize, **including entirely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your request and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](https://selectize.dev) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/fabienwnklr/selectize.js/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/fabienwnklr/selectize.js/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point, you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part to which the suggestion is related. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux. <!-- this should only be included if the project has a GUI -->
- **Explain why this enhancement would be useful** to most Selectize users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

### Your First Code Contribution

#### Build from source

Compile Javascript, SCSS and LESS in the `/src` directory to JavaScript and CSS in the `/build` directory.

Running `make` will build the project, run all tests, and update the distribution files in `/dist`.

#### Local Environment

Running `npm start` on your repo will start a web server allowing you to view a local copy of this documentation, where you can test your changes against our example pages.

If you are adding a new plugin, you should add a corresponding example page to the `/docs/docs/plugins` directory.

You can then run the examples at `https://loopback.website:4000/`.

### Improving The Documentation

### Commit Messages

Commit messages should be concise and descriptive and whenever possible reference the issue that they are addressing. They should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Pull Requests

If you're motivated to fix a bug or to develop a new feature, we'd love to see your code. When submitting pull requests, please remember the following:

- Make sure tests pass: Run `npm test` to make sure your changes don't break existing functionality
- Do not make changes to files in `/dist`. Limiting your edits to files in `/src` directories keeps the size of your pull request down and makes it easier for us to evaluate. We'll update the `/dist` folder after your pull request is approved.
- Add tests: In the best-case scenario, you are also adding tests to back up your changes, but don't sweat it if you don't. We can discuss them at a later date.
- Squash your commits together in one or a few complete, logical commits with a concise and descriptive message. One commit means one
  feature/bugfix/thing that has changed or a diff bringing the code one step forward to a better, working state.

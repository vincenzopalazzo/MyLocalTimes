# CONTRIBUTING

Contributions are very welcome. When contributing code, please follow these
simple guidelines.

* Run the tests with `npm test` and Github action it is happy.
* Don't add any new dependencies, but update and propose some change with better dependencies.
* Write properly formatted git commits (see below).
* If you don't know where to start, look to the good first issue, or a new issue

Git commits
-----------
A properly formed git commit subject line should always be able to complete the
following sentence:

     If applied, this commit will _____

For example, the following message is well formed:

     Add support for .gif files

In addition, it should be capitalized and *must not* include a period.

When it comes to formatting, here's a model git commit message[1]:

     Capitalized, short (50 chars or less) summary

     More detailed explanatory text, if necessary.  Wrap it to about 72
     characters or so.  In some contexts, the first line is treated as the
     subject of an email and the rest of the text as the body.  The blank
     line separating the summary from the body is critical (unless you omit
     the body entirely); tools like rebase can get confused if you run the
     two together.

     Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
     or "Fixes bug."  This convention matches up with commit messages generated
     by commands like git merge and git revert.

     Further paragraphs come after blank lines.

     - Bullet points are okay, too.

     - Typically a hyphen or asterisk is used for the bullet, followed by a
       single space, with blank lines in between, but conventions vary here.

     - Use a hanging indent.

---

[1]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

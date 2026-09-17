name: Bug report
about: Report a problem with the repository, data, schema, or documentation
title: ""
labels: bug
assignees: ""
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to report a bug or issue.

  - type: textarea
    id: description
    attributes:
      label: Issue description
      description: Describe the problem clearly and with as much detail as possible.
      placeholder: What happened? What did you expect to happen?
    validations:
      required: true

  - type: textarea
    id: reproduction
    attributes:
      label: Steps to reproduce
      description: Include any steps needed to reproduce the issue.
      placeholder: |
        1. Open the repository
        2. Review the file or data
        3. Observe the problem
    validations:
      required: false

  - type: textarea
    id: environment
    attributes:
      label: Environment
      description: Include relevant details such as browser, version, or tooling context.
      placeholder: Browser, OS, CLI version, data source, etc.
    validations:
      required: false

  - type: textarea
    id: additional
    attributes:
      label: Additional context
      description: Add any logs, screenshots, references, or related links.
      placeholder: Any context that helps us understand or reproduce the issue.
    validations:
      required: false
